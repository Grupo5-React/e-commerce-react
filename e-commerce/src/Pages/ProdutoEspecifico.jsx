import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GlobalContext from "../hooks/GlobalContext ";
import './ProdutoEspecifico.css';

const ProdutoEspecifico = () => {
  const { carrinho, usuarioLogado, setCarrinho } = useContext(GlobalContext);
  const { id } = useParams();
  const [produto, setProduto] = useState({});
  const [ratingValue, setRatingValue] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProductById();
  }, []);

  useEffect(() => {
    if (produto.avaliacoes) {
      const userRating = produto.avaliacoes.find(avaliacao => avaliacao.idUsuario === usuarioLogado?.id);
      if (userRating) {
        setUserRating(userRating.nota);
      }
    }
  }, [produto, usuarioLogado]);

  const getProductById = async () => {
    try {
      const response = await api.get(`/produto/${id}`);
      setProduto(response.data);
      setRatingValue(response.data.avaliacaoTotal / response.data.qtdAvaliacoes);
    } catch (error) {
      console.error("Failed to fetch product", error);
    }
  };

  const updateRating = async (newRating) => {
    const existingRating = produto.avaliacoes.find(avaliacao => avaliacao.idUsuario === usuarioLogado.id);
    const newAvaliacaoTotal = existingRating ? 
      produto.avaliacaoTotal - existingRating.nota + newRating : 
      produto.avaliacaoTotal + newRating;
    const newQtdAvaliacoes = existingRating ? produto.qtdAvaliacoes : produto.qtdAvaliacoes + 1;
    
    const updatedAvaliacoes = existingRating ? 
      produto.avaliacoes.map(avaliacao => 
        avaliacao.idUsuario === usuarioLogado.id ? { ...avaliacao, nota: newRating } : avaliacao
      ) : 
      [...produto.avaliacoes, { idUsuario: usuarioLogado.id, nota: newRating }];

    try {
      const response = await api.put(`/produto/${id}`, {
        ...produto,
        avaliacaoTotal: newAvaliacaoTotal,
        qtdAvaliacoes: newQtdAvaliacoes,
        avaliacoes: updatedAvaliacoes
      });
      setProduto(response.data);
      setRatingValue(response.data.avaliacaoTotal / response.data.qtdAvaliacoes);
      setUserRating(newRating);
    } catch (error) {
      console.error("Failed to update rating", error);
    }
  };

  const handleAdicionarCarrinho = (id) => {
    const produtoSelecionado = produto;
    const produtoJaNoCarrinho = carrinho.some(prod => prod.id === produtoSelecionado.id);
    setLoading(true);
    setTimeout(() => {
      if (!produtoJaNoCarrinho) {
        setCarrinho([
          ...carrinho,
          {
            ...produtoSelecionado,
            produtoQuantidades: 1,
          },
        ]);
      } else {
        alert('Produto já adicionado ao carrinho');
      }
      setLoading(false);
    }, 800);
  };

  const isProductRatedByCurrentUser = () => {
    return produto.avaliacoes?.some(avaliacao => avaliacao.idUsuario === usuarioLogado?.id);
  };

  return (
    <div className="product_container">
      <div className="product-page">
        <img
          className="product-image"
          src={produto.imgUrl}
          alt={produto.nome}
        />
        <div className="product-content">
          <h1 className="product-title">{produto.nome}</h1>
          <h3 className="product-description">{produto.descricao}</h3>
          <p className="product-price">R$ {produto.preco}</p>
          <Box
            sx={{
              '& > legend': { mt: 2 },
            }}
            className="user-rating"
          >
            <Typography component="legend" className="user-rating-title">
              Avaliação dos usuários
            </Typography>
            <Rating name="read-only" value={ratingValue} readOnly />
            <p className="user-rating-value">
              {ratingValue.toFixed(1)} estrelas
            </p>
            <p className="user-rating-reviews">
              {produto.qtdAvaliacoes} avaliações
            </p>
        {usuarioLogado ? (
          !isProductRatedByCurrentUser() ? (
            <>
              <Typography component="legend">Sua avaliação sobre este produto</Typography>
              <Rating
                name="simple-controlled"
                value={userRating}
                onChange={(event, newRating) => {
                  updateRating(newRating);
                }}
              />
            </>
          ) : (
            <>
              <Typography component="legend">Obrigado por avaliar este produto!</Typography>
              <Rating name="disabled" value={userRating} disabled />
            </>
          )
        ) : (
          <Typography component="legend">Faça login para avaliar este produto!</Typography>
        )}
        </Box>
        <button
          className="add-to-cart-button"
          onClick={() => handleAdicionarCarrinho(produto.id)}
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  </div>
  );
};

export default ProdutoEspecifico;
