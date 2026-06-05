import { formatCurrency } from '../../utils/formatters';

interface StatsCardsProps {
  totalProcesses: number;
  totalValue: number;
  activeProcesses: number;
  avgValue: number;
}

export const StatsCards = ({ totalProcesses, totalValue, activeProcesses, avgValue }: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Tarjeta 1: Procesos Activos */}
      <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant hover:border-primary transition-colors group">
        <div className="flex items-center justify-between mb-2">
          <span className="material-symbols-outlined text-primary bg-primary-fixed p-2 rounded-lg">account_balance</span>
          <span className="text-emerald-600 text-xs font-bold">+12%</span>
        </div>
        <p className="text-label-md text-on-surface-variant uppercase tracking-wider">Procesos Activos</p>
        <h3 className="text-headline-lg font-extrabold text-primary">{activeProcesses.toLocaleString()}</h3>
      </div>

      {/* Tarjeta 2: Alertas Nuevas (Total Procesos) */}
      <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant hover:border-error transition-colors">
        <div className="flex items-center justify-between mb-2">
          <span className="material-symbols-outlined text-error bg-error-container p-2 rounded-lg">priority_high</span>
          <span className="text-error text-xs font-bold">Crítico</span>
        </div>
        <p className="text-label-md text-on-surface-variant uppercase tracking-wider">Total Procesos</p>
        <h3 className="text-headline-lg font-extrabold text-primary">{totalProcesses.toLocaleString()}</h3>
      </div>

      {/* Tarjeta 3: Cuantía Total */}
      <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant hover:border-secondary transition-colors">
        <div className="flex items-center justify-between mb-2">
          <span className="material-symbols-outlined text-secondary bg-secondary-fixed p-2 rounded-lg">payments</span>
        </div>
        <p className="text-label-md text-on-surface-variant uppercase tracking-wider">Cuantía Total</p>
        <h3 className="text-headline-lg font-extrabold text-primary">{formatCurrency(totalValue)}</h3>
      </div>

      {/* Tarjeta 4: Valor Promedio */}
      <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-outline-variant hover:border-tertiary-container transition-colors">
        <div className="flex items-center justify-between mb-2">
          <span className="material-symbols-outlined text-tertiary-container bg-tertiary-fixed p-2 rounded-lg">visibility</span>
        </div>
        <p className="text-label-md text-on-surface-variant uppercase tracking-wider">Valor Promedio</p>
        <h3 className="text-headline-lg font-extrabold text-primary">{formatCurrency(avgValue)}</h3>
      </div>
    </div>
  );
};