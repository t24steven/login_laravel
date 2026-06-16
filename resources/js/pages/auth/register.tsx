import { Form, Head } from '@inertiajs/react';
import { ShieldCheck } from 'lucide-react';
import AppLogoIcon from '@/components/app-logo-icon';
import InputError from '@/components/input-error';
import PasswordInput from '@/components/password-input';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Spinner } from '@/components/ui/spinner';
import { login } from '@/routes';
import { store } from '@/routes/register';

type Props = {
    passwordRules: string;
};

export default function Register({ passwordRules }: Props) {
    return (
        <>
            <Head title="Crear cuenta" />

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
                                        <CardTitle className="text-2xl font-semibold tracking-tight">Crear cuenta</CardTitle>
                                        <CardDescription className="mt-1 text-sm text-muted-foreground">Completa tus datos para comenzar</CardDescription>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent className="px-0 sm:px-1">
                                <Form {...store.form()} resetOnSuccess={['password', 'password_confirmation']} className="space-y-6">
                                    {({ processing, errors }) => (
                                        <div className="grid gap-5">
                                            <div className="grid gap-2">
                                                <Label htmlFor="name">Nombre</Label>
                                                <Input id="name" name="name" type="text" autoComplete="name" autoFocus placeholder="Tu nombre completo" className="h-11 rounded-xl border-border/80 bg-background shadow-sm" />
                                                <InputError message={errors.name} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="email">Correo electrónico</Label>
                                                <Input id="email" name="email" type="email" autoComplete="email" placeholder="usuario@correo.com" className="h-11 rounded-xl border-border/80 bg-background shadow-sm" />
                                                <InputError message={errors.email} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="password">Contraseña</Label>
                                                <PasswordInput id="password" name="password" autoComplete="new-password" placeholder="Crea una contraseña" className="h-11 rounded-xl border-border/80 bg-background shadow-sm" passwordrules={passwordRules} />
                                                <InputError message={errors.password} />
                                            </div>
                                            <div className="grid gap-2">
                                                <Label htmlFor="password_confirmation">Confirmar contraseña</Label>
                                                <PasswordInput id="password_confirmation" name="password_confirmation" autoComplete="new-password" placeholder="Repite tu contraseña" className="h-11 rounded-xl border-border/80 bg-background shadow-sm" passwordrules={passwordRules} />
                                                <InputError message={errors.password_confirmation} />
                                            </div>
                                            <Button type="submit" className="h-11 w-full gap-2 rounded-xl text-sm font-semibold shadow-lg shadow-primary/10" disabled={processing} data-test="register-button">
                                                {processing && <Spinner />}
                                                Crear cuenta
                                            </Button>
                                            <p className="text-center text-sm text-muted-foreground">¿Ya tienes una cuenta? <TextLink href={login()} className="font-semibold text-primary hover:text-primary/90">Iniciar sesión</TextLink></p>
                                        </div>
                                    )}
                                </Form>
                            </CardContent>
                        </Card>
                    </section>
                </div>
            </div>
        </>
    );
}

Register.layout = {
    title: 'Crear cuenta',
    description: 'Completa tus datos para empezar',
};
