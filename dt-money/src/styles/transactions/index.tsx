import { Header } from "../../components/Header";
import { Summary } from "../../components/Summary";
import { SearchForm } from "./components/SearchForm";
import { PriceHightLight, TransactionsContainer, TransactionsTable } from "./styles";

export function Transactions(){
    return (
        <div>
            <Header />
            <Summary/>

           <TransactionsContainer>
            <SearchForm />
           <TransactionsTable>
                <tbody>
                    <tr>
                        <td width="50%">Desenvolvimento do site</td>
                        <td>
                            <PriceHightLight variant="income">
                            R$12.000,00
                            </PriceHightLight>
                         </td>
                        <td>venda</td>
                        <td>13/04/2022</td>
                    </tr>
                    <tr>
                        <td width="50%">Hamburguer</td>
                        <td>
                            <PriceHightLight variant="outcome">
                              - R$59,90
                            </PriceHightLight>
                         </td>
                        <td>Alimentação</td>
                        <td>10/04/2022</td>
                    </tr>
                    
                </tbody>
            </TransactionsTable>
           </TransactionsContainer>




        </div>
    )
}