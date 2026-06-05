// frontend/src/components/dashboard/SideWidgets.tsx

interface SideWidgetsProps {
  processes?: Array<{ id: string; deadline?: string }>;
}

export const SideWidgets = ({ processes = [] }: SideWidgetsProps) => {
  // Procesos que vencen pronto (ejemplo)
  const expiringProcesses = processes.slice(0, 2).map(p => ({
    id: p.id,
    timeLeft: Math.random() > 0.5 ? '2h restantes' : 'Mañana'
  }));

  const defaultProcesses = [
    { id: 'CO1.REQ.2039485', timeLeft: '2h restantes' },
    { id: 'CO1.REQ.2144590', timeLeft: 'Mañana' }
  ];

  const displayProcesses = expiringProcesses.length > 0 ? expiringProcesses : defaultProcesses;

  return (
    <div className="space-y-6">
      {/* Observatorio de Transparencia */}
      <div className="bg-primary p-6 rounded-2xl shadow-lg relative overflow-hidden">
        <div className="relative z-10 space-y-2">
          <h4 className="text-headline-md text-on-primary font-bold">Observatorio de Transparencia</h4>
          <p className="text-body-sm text-on-primary/80">Accede a datos abiertos actualizados en tiempo real.</p>
          <button className="mt-4 flex items-center gap-2 text-secondary-fixed font-bold hover:underline">
            Explorar
            <span className="material-symbols-outlined text-base">arrow_forward</span>
          </button>
        </div>
        <span className="material-symbols-outlined absolute -bottom-8 -right-8 text-[160px] opacity-10 text-white select-none">
          monitoring
        </span>
      </div>

      {/* Próximos Vencimientos */}
      <div className="bg-surface-container-high p-6 rounded-2xl border border-outline-variant flex flex-col justify-between h-[calc(50%-12px)]">
        <div>
          <h4 className="text-label-md font-bold text-primary uppercase mb-2">Próximos Vencimientos</h4>
          <div className="space-y-3">
            {displayProcesses.map((process, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-error' : 'bg-primary'}`}></div>
                <span className="text-body-sm font-bold truncate">{process.id}</span>
                <span className="text-[10px] text-on-surface-variant ml-auto">{process.timeLeft}</span>
              </div>
            ))}
          </div>
        </div>
        <button className="w-full mt-4 py-2 text-primary font-bold text-label-md border border-primary rounded-lg hover:bg-primary hover:text-on-primary transition-all">
          Ver calendario completo
        </button>
      </div>
    </div>
  );
};