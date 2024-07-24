import { GlobalStyle } from "./styles/global"
import { defaultTheme } from "./themes/default"
import {ThemeProvider} from "styled-components"

export function App() {
  
  return (
    
      <ThemeProvider theme = {defaultTheme}> 
          <GlobalStyle/>
           <h1>Hello word</h1>
      </ThemeProvider>

       
  )
}
