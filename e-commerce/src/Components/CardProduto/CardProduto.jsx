import React from 'react';
import './CardProduto.css';
import Loading from '../Loading';


const CardProduto = ({
  id,
  img,
  nome,
  descricao,
  preco,
  categoria,
  quantidade,
  AdicionarCarrinho,
  loading,
}) => {
  return (
    <div className="card">
    <a className='card-produto' href={`/produto/${id}`}>
        <img className='cardImg' src={img} alt={nome} />
        <p className="titulo">{nome}</p>
        <p>{descricao}</p>
        <p>{preco}</p>
        <p>{categoria}</p>
        <p>{quantidade}</p>
     </a>
      <button onClick={() => AdicionarCarrinho(id)}>
        {loading ? (
          <Loading height={'50px'} width={'50px'} />
        ) : (
          'Adicionar ao Carrinho'
        )}
      </button>
    </div>
  );
};

export default CardProduto;
