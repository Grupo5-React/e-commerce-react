import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/api';
import CardProduto from '../Components/CardProduto/CardProduto';

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
    (produto) => produto.categoria === categoria,
  );

  return (
    <div>
      <h1>Produtos da Categoria {categoria}</h1>

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
  );
};

export default ProdutoCategoria;
