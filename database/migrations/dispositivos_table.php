<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('dispositivos_detectados', function (Blueprint $table) {
            $table->id();
            $table->string('device_key')->unique();
            $table->string('ip')->nullable()->index();
            $table->text('user_agent');
            $table->string('accept_language')->nullable();
            $table->string('referer')->nullable();
            $table->string('platform')->nullable()->index();
            $table->string('browser')->nullable()->index();
            $table->string('device_type')->nullable()->index();
            $table->timestamp('first_seen_at')->nullable()->index();
            $table->timestamp('last_seen_at')->nullable()->index();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('dispositivos_detectados');
    }
};