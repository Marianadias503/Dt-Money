import { GlobalStyle } from "./styles/global"
import { Transactions } from "./styles/transactions"
import { defaultTheme } from "./themes/default"
import {ThemeProvider} from "styled-components"

export function App() {
  
  return (
    
      <ThemeProvider theme = {defaultTheme}> 
          <GlobalStyle/>
           <Transactions>
            
           </Transactions>
      </ThemeProvider>

       
  )
}
