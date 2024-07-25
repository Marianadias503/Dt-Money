import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";
import logoImg from '../../assets/logo.svg';
import * as Dialog from '@radix-ui/react-dialog';
import { NewTransactionModal } from "../NewTransactioModal";

export function Header (){
    return (
      <HeaderContainer>

        <HeaderContent>

            <img src={logoImg} alt="" />

            <Dialog.Root> {/*criação de um modal responsivo*/}
              <Dialog.Trigger asChild>
               <NewTransactionButton> Nova Transação</NewTransactionButton>
              </Dialog.Trigger>

            <NewTransactionModal></NewTransactionModal>
            

            </Dialog.Root>





       

        </HeaderContent>
      </HeaderContainer>
    )
}