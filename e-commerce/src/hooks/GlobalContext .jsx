import React, { useState } from 'react';

export const GlobalContext = React.createContext();

export const GlobalStorage = ({ children }) => {
  const [carrinho, setCarrinho] = useState([]);
  const [dados, setDados] = useState([]);
  const [filter, setFilter] = useState([]);

  return (
    <GlobalContext.Provider
      value={{ carrinho, setCarrinho, dados, setDados, filter, setFilter }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalContext;
