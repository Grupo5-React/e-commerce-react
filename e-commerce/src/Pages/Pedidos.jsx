import React, { useContext, useEffect, useState } from 'react';
import { api } from '../api/api';
import GlobalContext from '../hooks/GlobalContext ';
import "./Pedido.css"

const Pedidos = () => {
  const { usuarioLogado, carrinho } = useContext(GlobalContext);
  const [pedidos, setPedidos] = useState([]);
  const [produtos, setProdutos] = useState([]);
  
  
  useEffect(() => {
    getPedido();
    getProduto();
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
  
  const getProduto = async ()=>{
    const response = await api.get('/produto');
    setProdutos(response.data);
  }

  return (
    <div className='Pedido'>
      {pedidos.map((pedido) => (
        <div key={pedido.id}>
          <p>Número do pedido: {pedido.id} </p>
          {pedido.itens.map((item) => {
            const produto = produtos.find((produto) => produto.id === item.idProduto);
            if (produto) {
              return (
                <div key={item.id}>
                  <img src={produto.imgUrl} alt={produto.nome} />
                  <p>Produto: {produto.nome} </p>
                  <p>Quantidade: {item.quantidade}</p>
                </div>
              );
            } else {
              return null;
            }
          })}
          <p>Total: R$ {pedido.valorTotal.toFixed(2)}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default Pedidos;
