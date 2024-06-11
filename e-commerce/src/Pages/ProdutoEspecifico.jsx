import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/api";
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GlobalContext from "../hooks/GlobalContext ";

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
    <>
      <h1>{produto.nome}</h1>
      <h3>{produto.descricao}</h3>
      <img src={produto.imgUrl} alt={produto.nome} />
      <p>{produto.descricao}</p>
      <p>R$ {produto.preco}</p>
      <Box sx={{ "& > legend": { mt: 2 } }}>
        <Typography component="legend">Avaliação dos usuários</Typography>
        <Rating name="read-only" value={ratingValue} readOnly />
        <p>{ratingValue.toFixed(1)} estrelas</p>
        <p>{produto.qtdAvaliacoes} avaliações</p>
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
      <button onClick={() => handleAdicionarCarrinho(id)}>Adicionar ao Carrinho</button>
    </>
  );
};

export default ProdutoEspecifico;
