import React from 'react';

const Produto = ({
  id,
  img,
  nome,
  descricao,
  preco,
  categoria,
  quantidade,
}) => {
  return (
    <div>
      <img src={img} alt={nome} />
      <p>{nome}</p>
      <p>{descricao}</p>
      <p>{preco}</p>
      <p>{categoria}</p>
      <p>{quantidade}</p>
    </div>
  );
};

export default Produto;
