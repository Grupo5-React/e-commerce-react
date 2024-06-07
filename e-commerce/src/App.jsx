

import './App.css'
import {FaUser, FaLock} from 'react-icons/fa'
import Login from './Components/Login/Login'
import CadastroUsuario from './Components/CadastroUsuario/CadastroUsuario.jsx'
import Rotas from './routes/Routes.jsx'
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min.js'

function App() {
  

  return (
    <>
    <BrowserRouter>
        <Switch>
            <Route exact path='/Login' component ={Login} />
            <Route path='/CadastroUsuario' component ={CadastroUsuario} />
        </Switch>
     </BrowserRouter>
    </>
  )
}

export default App
