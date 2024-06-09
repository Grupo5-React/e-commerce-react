import React, { useContext, useState } from 'react';
import GlobalContext from '../hooks/GlobalContext ';
import { api } from '../api/api';

const Carrinho = () => {
  const { carrinho, setCarrinho } = useContext(GlobalContext);

  const [subTotal, setSubTotal] = useState(
    carrinho.map((produto) => produto.preco),
  );

  function handleAumentar(id) {
    const novoCarrinho = carrinho.map((item) => {
      if (item.id === id && item.quantidade > item.produtoQuantidades) {
        return {
          ...item,
          produtoQuantidades: item.produtoQuantidades + 1,
        };
      }
      console.log('produto limite no estoque');
      return item;
    });
    setCarrinho(novoCarrinho);
  }

  function handleDiminuir(id) {
    const novoCarrinho = carrinho.map((item) => {
      if (item.id === id && item.produtoQuantidades > 1) {
        return {
          ...item,
          produtoQuantidades: item.produtoQuantidades - 1,
        };
      }
      return item;
    });
    setCarrinho(novoCarrinho);
  }

  function handleRemover(id) {
    setCarrinho(carrinho.filter((item) => item.id !== id));
  }

  async function handleFinalizarCompra() {
    const itensPedido = [];
    const alterarQuantidade = [];
    let total = 0;
    carrinho.forEach((item) => {
      const subTotal = item.preco * item.produtoQuantidades;
      total += subTotal;
      itensPedido.push({
        idProduto: item.id,
        quantidade: item.produtoQuantidades,
      });
      alterarQuantidade.push({
        idProduto: item.id,
        quantidade: item.quantidade - item.produtoQuantidades,
      });
    });
    console.log('essa é quantidade ', alterarQuantidade);
    const response = await api.post('/pedido/', {
      valorTotal: total,
      idUser: '8b15',
      itens: itensPedido,
    });
    alterarQuantidade.forEach(async (item) => {
      try {
        const respose = await api.patch(`/produto/${item.idProduto}`, {
          quantidade: item.quantidade,
        });
        console.log(
          `Produto ${item.idProduto} atualizado com sucesso`,
          response.data,
        );
      } catch (error) {
        console.error(`Erro ao atualizar o produto ${item.idProduto}:`, error);
      }
    });
  }
  return (
    <div>
      {carrinho.map((produto, id) => (
        <div key={produto.id}>
          <p>{produto.nome}</p>
          <p>{subTotal[id] * produto.produtoQuantidades}</p>
          <p>{produto.categoria}</p>
          <p>{produto.produtoQuantidades}</p>
          <button onClick={() => handleDiminuir(produto.id)}>-</button>
          <button onClick={() => handleAumentar(produto.id)}>+</button>
          <br />
          <button onClick={() => handleRemover(produto.id)}>
            Remover Item
          </button>
        </div>
      ))}
      <button onClick={handleFinalizarCompra}>Finalizar Compra</button>
    </div>
  );
};

export default Carrinho;
