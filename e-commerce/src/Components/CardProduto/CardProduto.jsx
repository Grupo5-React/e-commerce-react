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
      <a  href={`/produto/${id}`}>
        <img src={img} alt={nome} className="imagem" />
        <p className="titulo">{nome}</p>
        <p>{descricao}</p>
        <p>R$ {preco.toFixed(2)}</p>
        <p>{categoria}</p>
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
