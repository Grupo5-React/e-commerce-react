import React, { useState } from 'react';
import './CardProduto.css';
import Loading from '../Loading';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import { Box, CircularProgress } from '@mui/material';
import { Link } from 'react-router-dom';

const CardProduto = ({
  id,
  img,
  nome,
  descricao,
  preco,
  categoria,
  quantidade,
  avaliacaoTotal,
  qtdAvaliacoes,
  AdicionarCarrinho,
  loading,
}) => {
  const currentRating = avaliacaoTotal / qtdAvaliacoes;
  const [ratingValue, setRatingValue] = useState(currentRating);

  return (
    <div className="card">
      <Link className="card_links" to={`/produto/${id}`}>
        <div className="card_img">
          <img src={img} alt={nome} className="imagem" />
        </div>
        <div>
          <p className="titulo">{nome}</p>
          <p>{descricao}</p>
          <p>R$ {preco.toFixed(2)}</p>
          <p>{categoria}</p>
        </div>
      </Link>
      <div className="avaliacao">
        <h3>Avaliação dos usuários</h3>
        <Rating name="read-only" value={ratingValue} readOnly />
        <p>{ratingValue.toFixed(1)} estrelas</p>
        <p>{qtdAvaliacoes} avaliações</p>
      </div>
      <button onClick={() => AdicionarCarrinho(id)}>
        {loading ? (
          // <Loading height={'50px'} width={'50px'} />
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
