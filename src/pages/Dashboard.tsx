export function Dashboard() {
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-neutral-900">Dashboard</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
          <h3 className="text-sm font-medium text-neutral-500">Patrimônio Total</h3>
          <p className="mt-2 text-3xl font-bold text-neutral-900 font-mono">R$ 0,00</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
          <h3 className="text-sm font-medium text-neutral-500">Renda Mensal Estimada</h3>
          <p className="mt-2 text-3xl font-bold text-success-600 font-mono text-primary-600">R$ 0,00</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-neutral-200">
          <h3 className="text-sm font-medium text-neutral-500">Rentabilidade Acumulada</h3>
          <p className="mt-2 text-3xl font-bold text-neutral-900 font-mono">0.00%</p>
        </div>
      </div>
    </div>
  );
}
