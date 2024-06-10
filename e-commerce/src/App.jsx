import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Produto from './Pages/Produto';
import Login from './Components/Login/Login';
import CadastroUsuario from './Components/CadastroUsuario/CadastroUsuario.jsx';
import ProdutoCategoria from './Pages/ProdutoCategoria.jsx';
import GlobalContext, { GlobalStorage } from './hooks/GlobalContext .jsx';
import Carrinho from './Pages/Carrinho.jsx';
import ProdutoEspecifico from './Pages/ProdutoEspecifico.jsx';
import Cabecalho from './Components/Header/header.jsx';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min.js';
import { useContext } from 'react';
import Pedidos from './Pages/Pedidos.jsx';

//import { autenticado } from './auth.js';
const RotaPrivada = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      autenticado ? (
        <Component {...props} />
      ) : (
        <Redirect to={{ pathname: '/', state: { from: props.location } }} />
      )
    }
  />
);

function App() {
  const { usuarioLogado } = useContext(GlobalContext);
  return (
    <>
      <BrowserRouter>
        <Cabecalho />
        {/*<nav className="nav">
          <Link to="/login">Login</Link>
          <Link to="/cadastroUsuario">Cadastro</Link>
          <Link to="/produtos">Produtos</Link>
          <Link to="/produtos/hds">HDs</Link>
          <Link to="/produtos/notebooks">Notebooks</Link>
          <Link to="/produtos/suprimentos">Suprimentos</Link>
          <Link to="/carrinho">carrinho</Link>
        </nav> */}
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/cadastroUsuario" component={CadastroUsuario} />
          <Route
            exact
            path="/produtos/:categoria"
            component={ProdutoCategoria}
          />
          <Route path="/produtos" component={Produto} />
          <Route exact path="/produto/:id" component={ProdutoEspecifico} />
          <Route exact path="/pedido" component={Pedidos} />
          <Route exact path="/carrinho" component={Carrinho} />
          {/*usuarioLogado ? (
            <Route exact path="/carrinho" component={Carrinho} />
          ) : (
            <Redirect to="/login" />
          )*/}
        </Switch>
      </BrowserRouter>
    </>
  );
}
export default App;
