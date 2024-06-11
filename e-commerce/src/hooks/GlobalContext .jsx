import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [dados, setDados] = useState([]);
  const [filter, setFilter] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);
  const [rota, SetRota] = useState();

  return (
    <GlobalContext.Provider
      value={{
        carrinho,
        setCarrinho,
        pedido,
        setPedido,
        dados,
        setDados,
        filter,
        setFilter,
        usuarioLogado,
        setUsuarioLogado,
        rota,
        SetRota,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
