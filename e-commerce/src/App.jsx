<<<<<<< HEAD


import './App.css'
import {FaUser, FaLock} from 'react-icons/fa'
import Login from './Components/Login/Login'
import CadastroUsuario from './Components/CadastroUsuario/CadastroUsuario.jsx'
import Rotas from './routes/Routes.jsx'
import { BrowserRouter, Route, Switch } from 'react-router-dom/cjs/react-router-dom.min.js'
=======
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Produto from './Pages/Produto';
import { FaUser, FaLock } from 'react-icons/fa';
import Login from './Components/Login/Login';
import CadastroUsuario from './Components/CadastroUsuario/CadastroUsuario.jsx';
import ProdutoCategoria from './Pages/ProdutoCategoria.jsx';
>>>>>>> 7ba06e7931b01080b78ad29b5da89ad16feb2d89

function App() {
  return (
    <>
<<<<<<< HEAD
    <BrowserRouter>
        <Switch>
            <Route exact path='/Login' component ={Login} />
            <Route path='/CadastroUsuario' component ={CadastroUsuario} />
        </Switch>
     </BrowserRouter>
=======
      <BrowserRouter>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/cadastroUsuario">Cadastro</Link>
          <Link to="/produtos">Produtos</Link>
          <Link to="/produtos/Gamer">Gamer</Link>
          <Link to="/produtos/eletronico">eletronico</Link>
        </nav>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/cadastroUsuario" component={CadastroUsuario} />
          <Route
            exact
            path="/produtos/:categoria"
            component={ProdutoCategoria}
          />
          <Route path="/produtos" component={Produto} />
        </Switch>
      </BrowserRouter>
>>>>>>> 7ba06e7931b01080b78ad29b5da89ad16feb2d89
    </>
  );
}
export default App;
