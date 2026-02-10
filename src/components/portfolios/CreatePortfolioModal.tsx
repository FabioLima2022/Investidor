import { Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { X } from 'lucide-react';

const createPortfolioSchema = z.object({
  name: z.string().min(3, 'Nome deve ter pelo menos 3 caracteres'),
  description: z.string().optional(),
  initialAmount: z.number().min(0, 'Valor inicial não pode ser negativo'),
  monthlyContribution: z.number().min(0, 'Aporte mensal não pode ser negativo'),
  riskProfile: z.enum(['conservative', 'moderate', 'aggressive']),
});

type CreatePortfolioFormData = z.infer<typeof createPortfolioSchema>;

interface CreatePortfolioModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: CreatePortfolioFormData) => void;
}

export function CreatePortfolioModal({ isOpen, onClose, onSubmit }: CreatePortfolioModalProps) {
  const { register, handleSubmit, formState: { errors } } = useForm<CreatePortfolioFormData>({
    resolver: zodResolver(createPortfolioSchema),
    defaultValues: {
      initialAmount: 0,
      monthlyContribution: 0,
      riskProfile: 'moderate',
    },
  });

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-gray-900 flex justify-between items-center"
                >
                  Nova Carteira
                  <button
                    onClick={onClose}
                    className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </Dialog.Title>
                
                <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                      Nome da Carteira
                    </label>
                    <input
                      type="text"
                      id="name"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                      placeholder="Ex: Aposentadoria 2030"
                      {...register('name')}
                    />
                    {errors.name && (
                      <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                      Descrição (Opcional)
                    </label>
                    <textarea
                      id="description"
                      rows={3}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                      placeholder="Objetivo e estratégia desta carteira..."
                      {...register('description')}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="initialAmount" className="block text-sm font-medium text-gray-700">
                        Aporte Inicial (R$)
                      </label>
                      <input
                        type="number"
                        id="initialAmount"
                        step="0.01"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                        {...register('initialAmount', { valueAsNumber: true })}
                      />
                      {errors.initialAmount && (
                        <p className="mt-1 text-sm text-red-600">{errors.initialAmount.message}</p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="monthlyContribution" className="block text-sm font-medium text-gray-700">
                        Aporte Mensal (R$)
                      </label>
                      <input
                        type="number"
                        id="monthlyContribution"
                        step="0.01"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                        {...register('monthlyContribution', { valueAsNumber: true })}
                      />
                      {errors.monthlyContribution && (
                        <p className="mt-1 text-sm text-red-600">{errors.monthlyContribution.message}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="riskProfile" className="block text-sm font-medium text-gray-700">
                      Perfil de Risco
                    </label>
                    <select
                      id="riskProfile"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm border p-2"
                      {...register('riskProfile')}
                    >
                      <option value="conservative">Conservador (Renda Fixa e FIIs)</option>
                      <option value="moderate">Moderado (Mix Equilibrado)</option>
                      <option value="aggressive">Arrojado (Ações e Cripto)</option>
                    </select>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                      onClick={onClose}
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-primary px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
                    >
                      Criar Carteira
                    </button>
                  </div>
                </form>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
