import { useContext } from "react";
import { Header } from "../../components/Header";
import { SearchForm } from "./components/SearchForm";
import { PriceHightLight, TransactionsContainer, TransactionsTable } from "./styles";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { Summary } from "../../components/Summary";

export function Transactions() {
  const { transactions } = useContext(TransactionsContext);

  // Função para validar e formatar a data
  const parseDate = (dateString: string) => {
    const date = new Date(dateString);
    return isNaN(date.getTime()) ? null : date; // Verifica se a data é válida
  };

  return (
    <div>
      <Header />
      <Summary />
      <TransactionsContainer>
        <SearchForm />
        <TransactionsTable>
          <tbody>
            {transactions.map((transaction) => {
              // Verifica e formata a data
              const createdAtDate = parseDate(transaction.createdAt);

              if (!createdAtDate) {
                console.error("Data inválida encontrada:", transaction.createdAt);
                return null; 
              }

              return (
                <tr key={transaction.id}>
                  <td width="50%">{transaction.description}</td>
                  <td>
                    <PriceHightLight variant={transaction.type}>
                      {transaction.type === 'outcome' && '- '}
                      {priceFormatter.format(transaction.price)}
                    </PriceHightLight>
                  </td>
                  <td>{transaction.category}</td>
                  <td>{dateFormatter.format(createdAtDate)}</td>
                </tr>
              );
            })}
          </tbody>
        </TransactionsTable>
      </TransactionsContainer>
    </div>
  );
}
