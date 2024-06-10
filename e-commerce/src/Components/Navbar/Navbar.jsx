import React, { useContext, useRef } from 'react';
import './Navbar.css';
import search_icon_light from '../../assets/search-w.png';
import search_icon_dark from '../../assets/search-b.png';
import { Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import GlobalContext from '../../hooks/GlobalContext ';
import Login from '@mui/icons-material/Login';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const Navbar = ({ theme, setTheme }) => {
  const { dados, setFilter } = useContext(GlobalContext);
  const inputRef = useRef();

  function handleFilter() {
    let valorInput = inputRef.current.value.toLowerCase().normalize();
    if (valorInput === '') {
      setFilter(dados);
    } else {
      const filtrados = dados.filter((produto) =>
        produto.nome.toLowerCase().normalize().startsWith(valorInput),
      );
      setFilter(filtrados);
    }
  }

  function handleChange() {
    handleFilter();
    console.log(inputRef);
  }

  return (
    <div className="navbar">
      <img src="../../assets/logo_navbar.png" alt="" className="logo" />

      <Toolbar>
        <Typography variant="h6" component="div"></Typography>
        <nav className="navbar">
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
          <div className="search-box">
            <input
              type="text"
              placeholder="Search"
              ref={inputRef}
              onChange={handleChange}
            />
            <img
              src={theme == 'light' ? search_icon_light : search_icon_dark}
              alt="Logo"
            />
          </div>
          <Link to="/login">
            <button>
              <PersonAddIcon />
            </button>
          </Link>
          <Link to="/login">
            <button>
              <Login />
            </button>
          </Link>

          <Link to="/carrinho">
            <button>
              <ShoppingCartIcon />
            </button>
          </Link>
        </nav>
      </Toolbar>
    </div>
  );
};

export default Navbar;
