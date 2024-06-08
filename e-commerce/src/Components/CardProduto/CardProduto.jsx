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
    <div className='card-produto'>
      <a href={`/produto/${id}`}>
        <img className="cardImg" src={img} alt={nome} />
        <p>{nome}</p>
        <p>{descricao}</p>
        <p>R$ {preco}</p>
        <p>{categoria}</p>
        <p>Em estoque: {quantidade}</p>
      </a>
      <button onClick={() => AdicionarCarrinho(id)}>
        Adicionar ao Carrinho
      </button>
    </div>
  );
};

export default CardProduto;
