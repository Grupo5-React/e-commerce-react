import { Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

export default function Cabecalho() {
  // const handleClickLogin = () => {
  //   window.open('/login');
  // };
  // const handleClickLogin = () => {
  //   window.open('/login');
  // };
  // const handleClickLogin = () => {
  //   window.open('/login');
  // };
  // const handleClickLogin = () => {
  //   window.open('/login');
  // };
  // const handleClickLogin = () => {
  //   window.open('/login');
  // };

  return (
    <div>
      <Toolbar>
        <Typography variant="h6" component="div"></Typography>
        <nav>
          <Link to="/login">
            <button>Login</button>
          </Link>
          <Link to="/login">
            <button>Cadastro Usuario</button>
          </Link>
          <Link to="/produtos">
            <button>Produtos</button>
          </Link>
          <Link to="/produtos/hds">
            <button>HDS</button>
          </Link>
          <Link to="/produtos/notebooks">
            <button>Notebooks</button>
          </Link>
          <Link to="/produtos/suprimentos">
            <button>Suprimentos</button>
          </Link>
          <Link to="/carrinho">
            <button>Carrinho</button>
          </Link>
        </nav>
      </Toolbar>
      {/* O conteúdo do seu aplicativo vai abaixo da barra de ferramentas */}
      <div>{/* Seu conteúdo aqui */}</div>
    </div>
  );
}
