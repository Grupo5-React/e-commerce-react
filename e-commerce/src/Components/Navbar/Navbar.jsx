import React, { useContext, useRef } from 'react';
import './Navbar.css';
import search_icon_light from '../../assets/search-w.png';
import search_icon_dark from '../../assets/search-b.png';
import { Link } from 'react-router-dom';
import GlobalContext from '../../hooks/GlobalContext ';
import Login from '@mui/icons-material/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Navbar = ({ theme, setTheme }) => {
  const { dados, setFilter,usuarioLogado } = useContext(GlobalContext);
  const inputRef = useRef();

  function handleFilter() {
    let valorInput = inputRef.current.value.toLowerCase().normalize();
    const filtrados = dados.filter((produto) =>
      produto.nome.toLowerCase().normalize().startsWith(valorInput),
    );
    setFilter(filtrados);
  }

  return (
    <header className="header">
      <nav className="navbar">
        <div className="navbar_links">
          <Link to="/produtos" onClick={handleFilter}>
            Produtos
          </Link>
          <Link to="/produtos/hds">HDS</Link>
          <Link to="/produtos/notebooks">Notebooks</Link>
          <Link to="/produtos/suprimentos">Suprimentos</Link>
          {usuarioLogado&& <Link to='/pedido'>Meus Pedidos</Link>}
        </div>
        <div className="search-container">
          <div className="search-box">
            <input type="text" placeholder="Buscar" ref={inputRef} />
            <img
              src={theme == 'light' ? search_icon_light : search_icon_dark}
              alt="Logo"
              onClick={handleFilter}
            />
          </div>

          <Link to="/cadastrousuario">
            <PersonAddIcon />
          </Link>
          <Link to="/login">
            <Login />
          </Link>

          <Link to="/carrinho">
            <ShoppingCartIcon />
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
