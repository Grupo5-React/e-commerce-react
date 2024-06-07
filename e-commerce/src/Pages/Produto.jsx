import { useEffect, useRef, useState } from 'react';
import CardProduto from '../Components/CardProduto/CardProduto';
import { api } from '../api/api';
import { useParams } from 'react-router-dom';

const Produto = () => {
  const [dados, setDados] = useState([]);
  const [filter, setFilter] = useState([]);
  const { categoria } = useParams();
  const inputRef = useRef();
  const [carrinho, setCarrinho] = useState([]);

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
    setCarrinho([...carrinho, produtoSelecionado]);
  }

  return (
    <div>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>Pesquisar</button>
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
          AdicionarCarrinho={handleAdicionarCarrinho}
        />
      ))}
    </div>
  );
};

export default Produto;
