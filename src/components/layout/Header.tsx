import { Bell } from 'lucide-react';

export function Header() {
  return (
    <header className="h-16 bg-white border-b border-neutral-200 flex items-center justify-between px-6 flex-shrink-0">
      <h1 className="text-xl font-semibold text-neutral-800">Visão Geral</h1>
      <div className="flex items-center space-x-4">
        <button className="p-2 text-neutral-500 hover:text-neutral-700 hover:bg-neutral-100 rounded-full relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-1.5 right-1.5 block h-2 w-2 rounded-full bg-danger ring-2 ring-white" />
        </button>
        <div className="flex items-center space-x-3 pl-4 border-l border-neutral-200">
          <div className="flex flex-col items-end">
            <span className="text-sm font-medium text-neutral-900">Investidor Arrojado</span>
            <span className="text-xs text-neutral-500">Premium</span>
          </div>
          <div className="h-8 w-8 rounded-full bg-primary-100 flex items-center justify-center text-primary-700 font-bold border border-primary-200">
            IA
          </div>
        </div>
      </div>
    </header>
  );
}
