import React, { useContext, useEffect, useRef, useState } from 'react';
import CardProduto from '../Components/CardProduto/CardProduto';
import { api } from '../api/api';
import GlobalContext from '../hooks/GlobalContext ';
import './Produto.css';

const Produto = () => {
  const inputRef = useRef();
  const { carrinho, dados, filter, setCarrinho, setDados, setFilter } =
    useContext(GlobalContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAll();
  }, []);

  async function getAll() {
    const response = await api.get('/produto');
    const produtoFiltrado = response.data.filter(
      (produto) => produto.quantidade > 0,
    );
    setFilter(produtoFiltrado);
    setDados(produtoFiltrado);
  }

  function handleClick() {
    const filtrados = dados.filter((produto) =>
      produto.nome
        .toLowerCase()
        .normalize()
        .startsWith(inputRef.current.value.toLowerCase().normalize()),
    );
    setFilter(filtrados);
  }

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
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>Pesquisar</button>
      <div className="flex">
        {filter.map((dado) => (
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

export default Produto;
