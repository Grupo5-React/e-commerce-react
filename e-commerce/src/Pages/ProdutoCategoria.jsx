import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/api';
import CardProduto from '../Components/CardProduto/CardProduto';
import './ProdutoCategoria.css';

const ProdutoCategoria = () => {
  const { categoria } = useParams();
  const [dados, setDados] = useState([]);

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

  return (
    <div className="container">
      <h1>Produtos da categoria {categoria}</h1>
      <div className="flex">
        {produtosPorCategoria.map((dado) => (
          <CardProduto
            key={dado.id}
            img={dado.imgUrl}
            nome={dado.nome}
            descricao={dado.descricao}
            preco={dado.preco}
            categoria={dado.categoria}
            quantidade={dado.quantidade}
          />
        ))}
      </div>
    </div>
  );
};

export default ProdutoCategoria;
