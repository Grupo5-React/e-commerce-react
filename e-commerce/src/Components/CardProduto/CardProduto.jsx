import React from 'react';
import './CardProduto.css'

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
    <a className='card-produto' href="#">
      <img className='cardImg' src={img} alt={nome} />
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
