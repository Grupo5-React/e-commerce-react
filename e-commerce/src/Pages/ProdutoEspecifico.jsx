import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import GlobalContext from "../hooks/GlobalContext ";
import './ProdutoEspecifico.css';

const ProdutoEspecifico = () => {
  const { carrinho, usuarioLogado, setCarrinho } = useContext(GlobalContext);
  const { id } = useParams();
  const [produto, setProduto] = useState({});
  const [ratingValue, setRatingValue] = useState(0);
  const [userRating, setUserRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProductById();
  }, []);

  useEffect(() => {
    if (produto.avaliacoes) {
      const userRating = produto.avaliacoes.find(avaliacao => avaliacao.idUsuario === usuarioLogado?.id);
      if (userRating) {
        setUserRating(userRating.nota);
        setComment(userRating.comentario);
      }
    }
  }, [produto, usuarioLogado]);

  const getProductById = async () => {
    try {
      const response = await api.get(`/produto/${id}`);
      setProduto(response.data);
      setRatingValue(response.data.avaliacaoTotal / response.data.qtdAvaliacoes);
    } catch (error) {
      console.error("Erro ao buscar produto", error);
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
        avaliacao.idUsuario === usuarioLogado.id ? { ...avaliacao, nota: newRating, comentario: comment } : avaliacao
      ) : 
      [...produto.avaliacoes, { idUsuario: usuarioLogado.id, nota: newRating, comentario: comment }];

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
      console.error("Erro ao atualizar avaliação", error);
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
          {console.log(typeof(produto.preco))}
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
                    setUserRating(newRating);
                  }}
                />
                <TextField
                  label="Comentário"
                  variant="outlined"
                  fullWidth
                  margin="normal"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => updateRating(userRating)}
                >
                  Enviar Avaliação
                </Button>
              </>
            ) : (
              <>
                <Typography component="legend">Obrigado por avaliar este produto!</Typography>
                <Rating name="disabled" value={userRating} disabled />
                <Typography>{comment}</Typography>
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
              <Box sx={{ mt: 2 }}>
            <Typography component="legend">Comentários</Typography>
            {produto.avaliacoes?.map((avaliacao, index) => (
              <Box key={index} sx={{ mb: 2, p: 2, border: '1px solid #ccc', borderRadius: '8px' }}>
                <Typography variant="subtitle2">
                  {avaliacao.idUsuario === usuarioLogado?.id ? "Você" : `Usuário ${avaliacao.idUsuario}`}
                </Typography>
                <Rating name="read-only" value={avaliacao.nota} readOnly />
                <Typography>{avaliacao.comentario}</Typography>
              </Box>
            ))}
          </Box>
        </div>
      </div>
    </div>
  );
};

export default ProdutoEspecifico;
