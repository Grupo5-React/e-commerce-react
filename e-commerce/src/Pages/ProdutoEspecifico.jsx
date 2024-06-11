import { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../api/api';
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import GlobalContext from '../hooks/GlobalContext ';
import './ProdutoEspecifico.css';

const ProdutoEspecifico = () => {
  const {
    carrinho,
    dados,
    filter,
    usuarioLogado,
    setCarrinho,
    setDados,
    setFilter,
  } = useContext(GlobalContext);
  const { id } = useParams();
  const [produto, setProduto] = useState({});
  const [ratingValue, setRatingValue] = useState(0);
  const [isRated, setIsRated] = useState(false);
  const [userRating, setUserRating] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProductById();
  }, []);

  const getProductById = async () => {
    const response = await api.get(`/produto/${id}`);
    setProduto(response.data);
    setRatingValue(response.data.avaliacaoTotal / response.data.qtdAvaliacoes);
  };

  const updateRating = async (newRating) => {
    const response = await api.put(`/produto/${id}`, {
      imgUrl: produto.imgUrl,
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      categoria: produto.categoria,
      quantidade: produto.quantidade,
      avaliacaoTotal: produto.avaliacaoTotal + newRating,
      qtdAvaliacoes: produto.qtdAvaliacoes + 1,
    });
    setProduto(response.data);
    setRatingValue(response.data.avaliacaoTotal / response.data.qtdAvaliacoes);
  };

  function handleAdicionarCarrinho(id) {
    const produtoSelecionado = produto;
    const produtoJaNoCarrinho = carrinho.some(
      (produto) => produto.id === produtoSelecionado.id,
    );
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
  }

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
              !isRated ? (
                <>
                  <Typography component="legend">
                    Sua avaliação sobre este produto
                  </Typography>
                  <Rating
                    name="simple-controlled"
                    value={ratingValue}
                    onChange={(event, newRating) => {
                      updateRating(newRating);
                      setUserRating(newRating);
                      setIsRated(true);
                    }}
                    className="user-rating-stars"
                  />
                </>
              ) : (
                <>
                  <Typography component="legend">
                    Obrigado por avaliar este produto!
                  </Typography>
                  <Rating name="disabled" value={userRating} disabled />
                </>
              )
            ) : (
              <Typography component="legend">
                Faça login para avaliar este produto!
              </Typography>
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
