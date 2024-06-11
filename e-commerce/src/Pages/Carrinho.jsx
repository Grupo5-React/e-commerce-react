import React, { useContext, useState } from 'react';
import GlobalContext from '../hooks/GlobalContext ';
import { api } from '../api/api';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import './Carrinho.css';
import { useLocation } from 'react-router-dom';

const Carrinho = () => {
  const { carrinho, pedido, setCarrinho, setPedido, usuarioLogado, SetRota } =
    useContext(GlobalContext);
  const history = useHistory();
  const location = useLocation();

  const [subTotal, setSubTotal] = useState(
    carrinho.map((produto) => produto.preco),
  );

  function handleAumentar(id) {
    const novoCarrinho = carrinho.map((item) => {
      if (item.id === id) {
        if (item.id === id && item.quantidade > item.produtoQuantidades) {
          return {
            ...item,
            produtoQuantidades: item.produtoQuantidades + 1,
          };
        } else {
          console.log('produto limite no estoque');
        }
      }
      return item;
    });
    setCarrinho(novoCarrinho);
  }

  function handleDiminuir(id) {
    const novoCarrinho = carrinho.map((item) => {
      if (item.id === id) {
        if (item.id === id && item.produtoQuantidades > 1) {
          return {
            ...item,
            produtoQuantidades: item.produtoQuantidades - 1,
          };
        } else {
          console.log('quantidade menor que 1');
        }
      }
      return item;
    });
    setCarrinho(novoCarrinho);
  }

  function handleRemoverItem(id) {
    setCarrinho(carrinho.filter((item) => item.id !== id));
  }

  function handleLimparCarrinho() {
    setCarrinho([]);
    alert('Carrinho Limpado com sucesso');
    history.push('/produtos');
  }

  async function handleFinalizarCompra() {
    if (usuarioLogado === null) {
      SetRota(location);
      console.log(location);
      history.push('/login');
    } else {
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
      setPedido([...pedido, { ...itensPedido, total }]);

      await api.post('/pedido/', {
        valorTotal: total,
        idUser: usuarioLogado.id,
        itens: itensPedido,
      });

      alterarQuantidade.forEach(async (item) => {
        try {
          const response = await api.patch(`/produto/${item.idProduto}`, {
            quantidade: item.quantidade,
          });
          console.log(
            `Produto ${item.idProduto} atualizado com sucesso`,
            response.data,
          );
        } catch (error) {
          console.error(
            `Erro ao atualizar o produto ${item.idProduto}:`,
            error,
          );
        }
      });
      setCarrinho([]);
      history.push('/pedido');
    }
  }

  console.log('essa é quantidadeasdasd ', pedido);
  return (
    <div className="container_carrinho">
      <div className="item">
        {carrinho.map((produto, id) => (
          <div key={produto.id} className="flex_carrinho">
            <div className="flex_carrinho_img">
              <img src={produto.imgUrl} alt={produto.nome} />
            </div>
            <div>
              <p>{produto.nome}</p>
              <p>{produto.categoria}</p>
            </div>
            <div className="flex_btn">
              <button onClick={() => handleDiminuir(produto.id)}>-</button>
              <p>{produto.produtoQuantidades}</p>
              <button onClick={() => handleAumentar(produto.id)}>+</button>
            </div>
            <p>R$ {(subTotal[id] * produto.produtoQuantidades).toFixed(2)}</p>
            <Tooltip title="Delete">
              <IconButton onClick={() => handleRemoverItem(produto.id)}>
                <DeleteIcon />
              </IconButton>
            </Tooltip>
          </div>
        ))}
        <div className="carrinho_btn">
          <button className="btn" onClick={handleLimparCarrinho}>
            Limpar Carrinho
          </button>
          <button className="btn" onClick={handleFinalizarCompra}>
            Finalizar Compra
          </button>
        </div>
      </div>
    </div>
  );
};

export default Carrinho;
