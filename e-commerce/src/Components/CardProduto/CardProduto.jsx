import React from 'react';
import './CardProduto.css';
import Loading from '../Loading';
import { Box, CircularProgress } from '@mui/material';

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
      <a href="#">
        <img src={img} alt={nome} className="imagem" />
        <p className="titulo">{nome}</p>
        <p>{descricao}</p>
        <p>{preco}</p>
        <p>{categoria}</p>
        <p>{quantidade}</p>
      </a>
      <button onClick={() => AdicionarCarrinho(id)}>
        {loading ? (
          /*<Loading height={'50px'} width={'50px'} />*/
          <Box sx={{ display: 'flex' }}>
            <CircularProgress />
          </Box>
        ) : (
          'Adicionar ao Carrinho'
        )}
      </button>
    </div>
  );
};
export default CardProduto;
