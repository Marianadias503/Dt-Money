import { createContext, ReactNode, useEffect, useState } from "react";
import { api } from "../libs/axios";

// Define o tipo da transação
export interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string; // Mantemos o tipo como string, pois vem da API
}

// Define o tipo do contexto
interface TransactionContextType {
  transactions: Transaction[];
  fetchTransactions: (query?: string) => Promise<void>;
  addTransaction: (newTransaction: Transaction) => void;
  deleteTransaction: (id: number) => void; // Adiciona o método de exclusão
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
      const response = await api.get('transactions', {
        params: {
          q: query,
        },
      });

      // Obtém as transações retornadas pela API
      let fetchedTransactions: Transaction[] = response.data;

      // Ordena as transações por data de criação (do mais recente para o mais antigo)
      fetchedTransactions.sort((a, b) => {
        const dateA = new Date(a.createdAt).getTime() || 0;
        const dateB = new Date(b.createdAt).getTime() || 0;

        return dateB - dateA;
      });

      // Verifica se uma query foi fornecida
      if (query) {
        // Aplica a filtragem de transações no frontend, caso a API não suporte o parâmetro `q`
        fetchedTransactions = fetchedTransactions.filter((transaction) =>
          transaction.description.toLowerCase().includes(query.toLowerCase())
        );
      }

      // Atualiza o estado das transações com os dados filtrados
      setTransactions(fetchedTransactions);
      console.log("Transações atualizadas:", fetchedTransactions);
    } catch (error) {
      console.error("Erro ao buscar transações:", error);
    }
  }

  function addTransaction(newTransaction: Transaction) {
    setTransactions((prevTransactions) => {
      const updatedTransactions = [newTransaction, ...prevTransactions];
      console.log("Transações atualizadas:", updatedTransactions);
      return updatedTransactions;
    });
  }

  // Função para excluir uma transação
  function deleteTransaction(id: number) {
    setTransactions((prevTransactions) => {
      const updatedTransactions = prevTransactions.filter(
        (transaction) => transaction.id !== id
      );
      console.log("Transações atualizadas após exclusão:", updatedTransactions);
      return updatedTransactions;
    });
  }

  // Efeito para buscar transações ao montar o componente
  useEffect(() => {
    fetchTransactions();
  }, []);

  return (
    <TransactionsContext.Provider value={{ transactions, fetchTransactions, addTransaction, deleteTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}
