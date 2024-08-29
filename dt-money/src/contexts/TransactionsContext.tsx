import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../libs/axios";

// Define o tipo da transação
interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

// Define o tipo do contexto
interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
}

// Define o tipo das propriedades do provedor de transações
interface TransactionsProviderProps {
  children: ReactNode;
}

// Cria o contexto com o tipo definido
export const TransactionsContext = createContext({} as TransactionContextType);

// Define o componente provedor de transações
export function TransactionProvider({ children }: TransactionsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  // Função para buscar transações da API
  async function fetchTransactions(query?: string) {
    try {
      // Faz a requisição para a API
      const response = await api.get('/transactions');

      // Obtém as transações retornadas pela API
      let fetchedTransactions: Transaction[] = response.data;

      // Verifica se uma query foi fornecida
      if (query) {
        // Aplica a filtragem de transações no frontend, caso a API não suporte o parâmetro `q`
        fetchedTransactions = fetchedTransactions.filter(transaction =>
          transaction.description.toLowerCase().includes(query.toLowerCase())
        );
      }

      // Atualiza o estado das transações com os dados filtrados
      setTransactions(fetchedTransactions);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  }

  // Efeito para buscar transações ao montar o componente
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions }}>
      {children}
    </TransactionsContext.Provider>
  );
}
