import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Produto from './Pages/Produto';
import { FaUser, FaLock } from 'react-icons/fa';
import Login from './Components/Login/Login';
import CadastroUsuario from './Components/CadastroUsuario/CadastroUsuario.jsx';
import ProdutoCategoria from './Pages/ProdutoCategoria.jsx';

function App() {
  return (
    <>
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
    </>
  );
}
export default App;
