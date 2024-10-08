import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import * as Dialog from '@radix-ui/react-dialog';
import { CloseButton, Content, Overlay, TransactionType, TransactionTypeButton } from './styles';
import * as z from 'zod';
import { Controller, useForm } from 'react-hook-form'; 
import { zodResolver } from '@hookform/resolvers/zod';
import { api } from "../../libs/axios";
import { useContext } from 'react';
import { TransactionsContext } from '../../contexts/TransactionsContext';
import { AxiosResponse } from 'axios'; 
import { Transaction } from '../../contexts/TransactionsContext';

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(['income', 'outcome']),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  const { addTransaction } = useContext(TransactionsContext);
  const {
    control,
    register,
    handleSubmit,  
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: { type: 'income' },
  });

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    const { description, price, category, type } = data; 

    try {
      // Tipifica a resposta da API
      const response: AxiosResponse<Transaction> = await api.post('/transactions', {
        description,
        price,
        category,
        type,
        createdAt: new Date().toISOString(), // Formata a data para o formato ISO string
      });

      // Obtém a nova transação da resposta
      const newTransaction: Transaction = response.data;
      addTransaction(newTransaction); // Adiciona a nova transação ao estado global

      reset();
    } catch (error) {
      console.error("Erro ao criar nova transação:", error);
    }
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>Nova Transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
 
        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register('description')}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register('price', { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register('category')}
          />

          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <TransactionType onValueChange={field.onChange} value={field.value}>
                <TransactionTypeButton
                  variant="income"
                  value="income"
                  {...register('type')}
                >
                  <ArrowCircleUp />
                  Entrada
                </TransactionTypeButton>

                <TransactionTypeButton
                  variant="outcome"
                  value="outcome"
                  {...register('type')}
                >
                  <ArrowCircleDown />
                  Saída
                </TransactionTypeButton>
              </TransactionType>
            )}
          />

          <button type="submit" disabled={isSubmitting}>Cadastrar</button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
