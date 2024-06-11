import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Produto from './Pages/Produto';
import Login from './Components/Login/Login';
import CadastroUsuario from './Components/CadastroUsuario/CadastroUsuario.jsx';
import ProdutoCategoria from './Pages/ProdutoCategoria.jsx';
import GlobalContext from './hooks/GlobalContext .jsx';
import Carrinho from './Pages/Carrinho.jsx';
import ProdutoEspecifico from './Pages/ProdutoEspecifico.jsx';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min.js';
import { useContext } from 'react';
import Pedidos from './Pages/Pedidos.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';

function App() {
  const { usuarioLogado } = useContext(GlobalContext);
  return (
    <>
      {/*  <Cabecalho/>*/}
      <BrowserRouter>
        {/* <Cabecalho /> */}
        <Navbar />
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
           {/* usuarioLogado ? (
            <Route exact path="/pedido" component={Pedidos} />
          ) : (
            <Redirect to="/login" />
           ) */}
          <Route exact path="/carrinho" component={Carrinho} />
          usuarioLogado ? (
            <Route exact path="/carrinho" component={Carrinho} />
          ) : (
            <Redirect to="/" />
          )*
        </Switch>
      </BrowserRouter>
    </>
  );
}
export default App;
