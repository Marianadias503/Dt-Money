import { useContext } from 'react';
import { TransactionsContext } from '../contexts/TransactionsContext';

export function useSummary() {
  const { transactions } = useContext(TransactionsContext);

  // Calcula o resumo das transações
  const summary = transactions.reduce(
    (acc, transaction) => {
      // Verifica se transaction.price é um número válido
      if (typeof transaction.price === 'number' && !isNaN(transaction.price)) {
        if (transaction.type === 'income') {
          acc.income += transaction.price;
          acc.total += transaction.price;
        } else {
          acc.outcome += transaction.price;
          acc.total -= transaction.price;
        }
      }
      return acc;
    },
    { income: 0, outcome: 0, total: 0 }
  );

  return summary;
}
