import React, { useState } from 'react';
import './CardProduto.css';
import Loading from '../Loading';
import { Box, CircularProgress } from '@mui/material';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
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
  const currentRating = avaliacaoTotal / qtdAvaliacoes
  const [ratingValue, setRatingValue] = useState(currentRating)

  return (
    <div className="card">
      <Link to={`/produto/${id}`}>
        <img src={img} alt={nome} className="imagem" />
        <p className="titulo">{nome}</p>
        <p>{descricao}</p>
        <p>R$ {preco.toFixed(2)}</p>
        <p>{categoria}</p>
      </Link>
      <Box
        sx={{
          "& > legend": { mt: 2 },
        }}
      >
        <Typography component="legend">Avaliação dos usuários</Typography>
        <Rating name="read-only" value={ratingValue} readOnly />
        <p>{ratingValue.toFixed(1)} estrelas</p>
        <p>{qtdAvaliacoes} avaliações</p>
      </Box>
      <button onClick={() => AdicionarCarrinho(id)}>
        {loading ? (
          // <Loading height={'50px'} width={'50px'} />
          <Box sx={{ display: "flex" }}>
            <CircularProgress />
          </Box>
        ) : (
          "Adicionar ao Carrinho"
        )}
      </button>
    </div>
  );
};
export default CardProduto;