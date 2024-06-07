import React from 'react';

const CardProduto = ({
  id,
  img,
  nome,
  descricao,
  preco,
  categoria,
  quantidade,
  AdicionarCarrinho,
}) => {
  return (
    <a href="#">
      <img src={img} alt={nome} />
      <p>{nome}</p>
      <p>{descricao}</p>
      <p>{preco}</p>
      <p>{categoria}</p>
      <p>{quantidade}</p>
      <button onClick={() => AdicionarCarrinho(id)}>
        Adicionar ao Carrinho
      </button>
    </a>
  );
};

export default CardProduto;
