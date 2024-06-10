import React, { useState } from 'react';

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [pedido, setPedido] = useState([]);
  const [dados, setDados] = useState([]);
  const [filter, setFilter] = useState([]);
  const [usuarioLogado, setUsuarioLogado] = useState(null);

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
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
