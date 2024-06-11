import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import './App.css';
import Produto from './Pages/Produto';
import Login from './Components/Login/Login';
import CadastroUsuario from './Components/CadastroUsuario/CadastroUsuario.jsx';
import ProdutoCategoria from './Pages/ProdutoCategoria.jsx';
import Carrinho from './Pages/Carrinho.jsx';
import ProdutoEspecifico from './Pages/ProdutoEspecifico.jsx';
import Pedidos from './Pages/Pedidos.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import Footer from './Components/Footer/Footer.jsx';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route path="/cadastrousuario" component={CadastroUsuario} />
          <Route
            exact
            path="/produtos/:categoria"
            component={ProdutoCategoria}
          />
          <Route path="/" component={Produto} />
          <Route path="/produtos" component={Produto} />
          <Route exact path="/produto/:id" component={ProdutoEspecifico} />
          <Route exact path="/pedido" component={Pedidos} />
          <Route exact path="/carrinho" component={Carrinho} />
        </Switch>
        <Footer />
      </BrowserRouter>
    </>
  );
}
export default App;
