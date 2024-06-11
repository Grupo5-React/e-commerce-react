import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/api';
import CardProduto from '../Components/CardProduto/CardProduto';
import './ProdutoCategoria.css';
import GlobalContext from '../hooks/GlobalContext ';


const ProdutoCategoria = () => {
  const { carrinho, dados, filter, setCarrinho, setDados, setFilter } =
    useContext(GlobalContext);
  const [loading, setLoading] = useState(false);
  const { categoria } = useParams();
  // const [dados, setDados] = useState([]);

  useEffect(() => {
    getAll();
  }, []);

  async function getAll() {
    const response = await api.get('/produto');
    const produtoFiltrado = response.data.filter(
      (produto) => produto.quantidade > 0,
    );
    setDados(produtoFiltrado);
  }
  const produtosPorCategoria = dados.filter(
    (produto) => produto.categoria.toLowerCase() === categoria,
  );

  function handleAdicionarCarrinho(id) {
    const produtoSelecionado = dados.find((produto) => produto.id === id);
    const produtoJaNoCarrinho = carrinho.some(
      (produto) => produto.id === produtoSelecionado.id,
    );
    setLoading(true);
    setTimeout(() => {
      if (!produtoJaNoCarrinho) {
        setCarrinho([
          ...carrinho,
          {
            ...produtoSelecionado,
            produtoQuantidades: 1,
          },
        ]);
      } else {
        alert('Produto já adicionado ao carrinho');
      }
      setLoading(false);
    }, 800);
  }

  return (
    <div className="container">
      <h1>Produtos da categoria {categoria}</h1>

<div className="flex">
      {produtosPorCategoria.map((dado) => (
        <CardProduto
        key={dado.id}
        id={dado.id}
        img={dado.imgUrl}
        nome={dado.nome}
        descricao={dado.descricao}
        preco={dado.preco}
        categoria={dado.categoria}
        quantidade={dado.quantidade}
        avaliacaoTotal={dado.avaliacaoTotal}
        qtdAvaliacoes={dado.qtdAvaliacoes}
        loading={loading}
        AdicionarCarrinho={handleAdicionarCarrinho}
      />
      ))}
        </div>
    </div>
  );
};

export default ProdutoCategoria;
