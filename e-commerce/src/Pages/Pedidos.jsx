import React, { useContext, useEffect, useState } from 'react';
import { api } from '../api/api';
import GlobalContext from '../hooks/GlobalContext ';
import "./Pedido.css"

const Pedidos = () => {
  const { usuarioLogado, carrinho } = useContext(GlobalContext);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    getPedido();
  }, []);

  async function getPedido() {
    try {
      const response = await api.get('/pedido');
      console.log(response);
      const pedidoFiltrado = response.data.filter((pedido) => {
        console.log(pedido.idUser);
        return pedido.idUser === usuarioLogado.id;
      });
      setPedidos(pedidoFiltrado);
    } catch (error) {
      console.error('Erro ao buscar pedidos:', error);
    }
  }

  return (
    <div className='Pedido'>
      {pedidos.map((pedido) => (
        <div key={pedido.id}>
          <p>Número do pedido: {pedido.id} </p>
          {carrinho.map((item) => (
            <div key={item.id}>
              <img src={item.imgUrl} alt={item.nome} />
              <p>Produto: {item.nome} </p>
              <p>Quantidade: {item.produtoQuantidades}</p>
            </div>
          ))}
          <p>Total:${pedido.valorTotal} </p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Pedidos;
