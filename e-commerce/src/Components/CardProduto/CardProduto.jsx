import React from 'react';
import './CardProduto.css'
import { Link } from 'react-router-dom';

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
    <a className='card-produto' href={`/produto/${id}`}>
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
