import { Form, Head } from '@inertiajs/react';
import { ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
/* @chisel-registration */
import { register } from '@/routes';
/* @end-chisel-registration */
import { store } from '@/routes/login';
import { request } from '@/routes/password';
/* @chisel-passkeys */
import PasskeyVerify from '@/components/passkey-verify';
/* @end-chisel-passkeys */

type Props = {
    status?: string;
    canResetPassword: boolean;
};

export default function Login({ status, canResetPassword }: Props) {
    return (
        <>
            <Head title="Iniciar sesión" />

            {/* @chisel-passkeys */}
            <PasskeyVerify />
            {/* @end-chisel-passkeys */}

            <div className="min-h-svh bg-background px-4 py-8 text-foreground sm:px-6 lg:px-8">
                <div className="mx-auto flex min-h-[calc(100vh-4rem)] w-full max-w-5xl items-center justify-center">
                    <section className="flex w-full items-center justify-center p-6 sm:p-8 lg:p-10">
                            <Card className="w-full max-w-md border border-border/60 bg-white/95 shadow-xl dark:bg-slate-950/90">
                                <CardHeader className="space-y-4 px-0 pb-4 text-left sm:px-1">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary shadow-sm ring-1 ring-primary/10">
                                            <AppLogoIcon className="h-6 w-6 fill-current" />
                                        </div>
                                        <div>
                                            <CardTitle className="text-2xl font-semibold tracking-tight">Iniciar sesión</CardTitle>
                                            <CardDescription className="mt-1 text-sm text-muted-foreground">Ingresa tus credenciales para continuar</CardDescription>
                                        </div>
                                    </div>
                                </CardHeader>
                                <CardContent className="px-0 sm:px-1">
                                    <Form {...store.form()} resetOnSuccess={['password']} className="space-y-6">
                                        {({ processing, errors }) => (
                                            <>
                                                <div className="grid gap-5">
                                                    <div className="grid gap-2">
                                                        <Label htmlFor="email">Correo electrónico</Label>
                                                        <Input id="email" type="email" name="email" required autoFocus tabIndex={1} autoComplete="email" placeholder="usuario@correo.com" className="h-11 rounded-xl border-border/80 bg-background shadow-sm" />
                                                        <InputError message={errors.email} />
                                                    </div>
                                                    <div className="grid gap-2">
                                                        <div className="flex items-center justify-between gap-3">
                                                            <Label htmlFor="password">Contraseña</Label>
                                                            {canResetPassword && (
                                                                <TextLink href={request()} className="text-sm text-primary hover:text-primary/90" tabIndex={5}>¿Olvidaste tu contraseña?</TextLink>
                                                            )}
                                                        </div>
                                                        <PasswordInput id="password" name="password" required tabIndex={2} autoComplete="current-password" placeholder="Tu contraseña" className="h-11 rounded-xl border-border/80 bg-background shadow-sm" />
                                                        <InputError message={errors.password} />
                                                    </div>
                                                    <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-muted/40 px-3 py-2">
                                                        <label htmlFor="remember" className="flex items-center gap-3 text-sm text-muted-foreground">
                                                            <Checkbox id="remember" name="remember" tabIndex={3} />
                                                            Recordarme
                                                        </label>
                                                        <span className="text-xs uppercase tracking-[0.25em] text-primary/80">Segura</span>
                                                    </div>
                                                    <Button type="submit" className="h-11 w-full gap-2 rounded-xl text-sm font-semibold shadow-lg shadow-primary/10" tabIndex={4} disabled={processing} data-test="login-button">
                                                        {processing && <Spinner />}
                                                        Entrar
                                                        <ArrowRight className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                                {/* @chisel-registration */}
                                                <div className="pt-2 text-center text-sm text-muted-foreground">
                                                    ¿No tienes una cuenta?{' '}
                                                    <TextLink href={register()} tabIndex={5} className="font-semibold text-primary hover:text-primary/90">Crear cuenta</TextLink>
                                                </div>
                                                {/* @end-chisel-registration */}
                                            </>
                                        )}
                                    </Form>

                                    {status && (
                                        <div className="mt-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 px-4 py-3 text-center text-sm font-medium text-emerald-700 dark:text-emerald-300">{status}</div>
                                    )}
                                </CardContent>
                            </Card>
                        </section>
                </div>
            </div>
        </>
    );
}

Login.layout = {
    title: 'Inicia sesión en tu cuenta',
    description: 'Ingresa tu correo y contraseña para acceder',
};
