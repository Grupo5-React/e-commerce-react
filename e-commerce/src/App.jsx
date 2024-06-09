import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Produto from './Pages/Produto';
import { FaUser, FaLock } from 'react-icons/fa';
import Login from './Components/Login/Login';
import CadastroUsuario from './Components/CadastroUsuario/CadastroUsuario.jsx';
import ProdutoCategoria from './Pages/ProdutoCategoria.jsx';
import { GlobalStorage } from './hooks/GlobalContext .jsx';
import Carrinho from './Pages/Carrinho.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <nav>
          <Link to="/login">Login</Link>
          <Link to="/cadastroUsuario">Cadastro</Link>
          <Link to="/produtos">Produtos</Link>
          <Link to="/produtos/hds">HDs</Link>
          <Link to="/produtos/notebooks">Notebooks</Link>
          <Link to="/produtos/suprimentos">Suprimentos</Link>
          <Link to="/carrinho">carrinho</Link>
        </nav>
        <Switch>
          <GlobalStorage>
            <Route exact path="/login" component={Login} />
            <Route path="/cadastroUsuario" component={CadastroUsuario} />
            <Route
              exact
              path="/produtos/:categoria"
              component={ProdutoCategoria}
            />
            <Route exact path="/carrinho" component={Carrinho} />
            <Route path="/produtos" component={Produto} />
          </GlobalStorage>
        </Switch>
      </BrowserRouter>
    </>
  );
}
export default App;
