<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Mail;

class DetectarDispositivo
{
    public function handle(Request $request, Closure $next)
    {
        $ua = (string) $request->userAgent();
        $ip = $request->ip();
        $deviceKey = sha1($ip . '|' . $ua);

        $seen = Cache::get("device_seen:$deviceKey");

        if (!$seen) {
            Cache::put("device_seen:$deviceKey", true, now()->addDays(30));

            $info = [
                'device_key' => $deviceKey,
                'ip' => $ip,
                'user_agent' => $ua,
                'accept_language' => $request->header('Accept-Language'),
                'referer' => $request->header('Referer'),
                'platform' => $this->platform($ua),
                'browser' => $this->browser($ua),
                'device_type' => $this->deviceType($ua),
                'first_seen_at' => now(),
                'last_seen_at' => now(),
                'created_at' => now(),
                'updated_at' => now(),
            ];

            DB::table('dispositivos_detectados')->updateOrInsert(
                ['device_key' => $deviceKey],
                $info
            );

            $to = config('services.device_alerts.to');

            if ($to) {
                Mail::raw($this->mailBody($info), function ($message) use ($to) {
                    $message->to($to)->subject('Nuevo dispositivo detectado');
                });
            }
        } else {
            DB::table('dispositivos_detectados')
                ->where('device_key', $deviceKey)
                ->update([
                    'last_seen_at' => now(),
                    'updated_at' => now(),
                ]);
        }

        return $next($request);
    }

    private function platform(string $ua): string
    {
        if (str_contains($ua, 'Windows')) return 'Windows';
        if (str_contains($ua, 'Mac')) return 'macOS';
        if (str_contains($ua, 'Android')) return 'Android';
        if (str_contains($ua, 'iPhone') || str_contains($ua, 'iPad')) return 'iOS';
        if (str_contains($ua, 'Linux')) return 'Linux';
        return 'Unknown';
    }

    private function browser(string $ua): string
    {
        if (str_contains($ua, 'Edg/')) return 'Edge';
        if (str_contains($ua, 'Firefox/')) return 'Firefox';
        if (str_contains($ua, 'Chrome/')) return 'Chrome';
        if (str_contains($ua, 'Safari/') && !str_contains($ua, 'Chrome/')) return 'Safari';
        return 'Unknown';
    }

    private function deviceType(string $ua): string
    {
        if (str_contains($ua, 'Mobile')) return 'Mobile';
        if (str_contains($ua, 'Tablet')) return 'Tablet';
        return 'Desktop';
    }

    private function mailBody(array $info): string
    {
        return "Nuevo dispositivo detectado\n\n" .
            "IP: {$info['ip']}\n" .
            "Plataforma: {$info['platform']}\n" .
            "Navegador: {$info['browser']}\n" .
            "Tipo: {$info['device_type']}\n" .
            "Idioma: {$info['accept_language']}\n" .
            "Referer: {$info['referer']}\n" .
            "Hora: " . now()->toDateTimeString();
    }
}