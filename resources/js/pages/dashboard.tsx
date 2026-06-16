import { Head } from '@inertiajs/react';
import { Activity, Bell, ShieldCheck, Users } from 'lucide-react';
import { dashboard } from '@/routes';

export default function Dashboard() {
    return (
        <>
            <Head title="Dashboard" />

            <div className="min-h-screen bg-slate-50 p-6 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
                <div className="mx-auto flex max-w-7xl flex-col gap-6">
                    <header className="rounded-3xl border border-border/60 bg-white p-6 shadow-sm dark:bg-slate-900/90">
                        <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Overview</p>
                        <div className="mt-3 flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
                            <div>
                                <h1 className="text-3xl font-semibold tracking-tight">Dashboard</h1>
                                <p className="mt-1 text-sm text-muted-foreground">Resumen claro de tu espacio de trabajo y actividad reciente.</p>
                            </div>
                            <div className="rounded-2xl border border-border/60 bg-muted/40 px-4 py-2 text-sm text-muted-foreground">Todo está funcionando correctamente</div>
                        </div>
                    </header>

                    <section className="grid gap-4 md:grid-cols-3">
                        {[
                            { label: 'Usuarios activos', value: '24', icon: Users, tone: 'from-cyan-500/10 to-cyan-500/5' },
                            { label: 'Alertas', value: '3', icon: Bell, tone: 'from-amber-500/10 to-amber-500/5' },
                            { label: 'Estado', value: 'Seguro', icon: ShieldCheck, tone: 'from-emerald-500/10 to-emerald-500/5' },
                        ].map((item) => {
                            const Icon = item.icon;
                            return (
                                <article key={item.label} className={`rounded-3xl border border-border/60 bg-gradient-to-br ${item.tone} p-5 shadow-sm`}>
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-muted-foreground">{item.label}</span>
                                        <Icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <p className="mt-4 text-3xl font-semibold tracking-tight">{item.value}</p>
                                </article>
                            );
                        })}
                    </section>

                    <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                        <article className="rounded-3xl border border-border/60 bg-white p-6 shadow-sm dark:bg-slate-900/90">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Actividad</p>
                                    <h2 className="mt-2 text-xl font-semibold">Actividad reciente</h2>
                                </div>
                                <Activity className="h-5 w-5 text-primary" />
                            </div>
                            <div className="mt-5 space-y-3">
                                {['Se actualizó tu perfil.', 'Se registró un nuevo acceso.', 'Se validó la seguridad de la cuenta.'].map((entry) => (
                                    <div key={entry} className="rounded-2xl border border-border/60 bg-muted/30 p-4 text-sm text-muted-foreground">{entry}</div>
                                ))}
                            </div>
                        </article>

                        <aside className="rounded-3xl border border-border/60 bg-white p-6 shadow-sm dark:bg-slate-900/90">
                            <p className="text-sm font-semibold uppercase tracking-[0.25em] text-primary">Acciones rápidas</p>
                            <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                                {['Revisar seguridad', 'Actualizar preferencias', 'Ver historial de sesiones'].map((item) => (
                                    <div key={item} className="rounded-2xl border border-border/60 bg-muted/30 p-4">{item}</div>
                                ))}
                            </div>
                        </aside>
                    </section>
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};
