import { MagnifyingGlass } from "phosphor-react";
import { SeacrhFormContainer } from "./styles";


export function SearchForm(){
    return (
      
            <SeacrhFormContainer>

                <input type="text" placeholder="Busque por transações" />
                <button type="submit"> 
                    <MagnifyingGlass size={20}/>
                    Buscar   
                 </button>


            </SeacrhFormContainer>
        
    )
}