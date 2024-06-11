import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../api/api"
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import GlobalContext from "../hooks/GlobalContext ";

const ProdutoEspecifico = () => {
  const { carrinho, dados, filter, usuarioLogado, setCarrinho, setDados, setFilter } =
  useContext(GlobalContext);
  const { id } = useParams()
  const [produto, setProduto] = useState({})
  const [ratingValue, setRatingValue] = useState(0)
  const [isRated, setIsRated] = useState(false)
  const [userRating, setUserRating] = useState(0)
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getProductById()
  }, [])

  const getProductById = async () => {
    const response = await api.get(`/produto/${id}`)
    setProduto(response.data)
    setRatingValue(response.data.avaliacaoTotal / response.data.qtdAvaliacoes)
  }

  const updateRating = async (newRating) => {
    const response = await api.put(`/produto/${id}`, {
      imgUrl: produto.imgUrl,
      nome: produto.nome,
      descricao: produto.descricao,
      preco: produto.preco,
      categoria: produto.categoria,
      quantidade: produto.quantidade,
      avaliacaoTotal: produto.avaliacaoTotal + newRating,
      qtdAvaliacoes: produto.qtdAvaliacoes + 1
    })
    setProduto(response.data)
    setRatingValue(response.data.avaliacaoTotal / response.data.qtdAvaliacoes)
  }

  function handleAdicionarCarrinho(id) {
    const produtoSelecionado = produto
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
    <>
      <h1>{produto.nome}</h1>
      <h3>{produto.descricao}</h3>
      <img src={produto.imgUrl} alt={produto.nome} />
      <p>{produto.descricao}</p>
      <p>R$ {produto.preco}</p>
      <Box
        sx={{
          "& > legend": { mt: 2 },
        }}
      >
        <Typography component="legend">Avaliação dos usuários</Typography>
        <Rating name="read-only" value={ratingValue} readOnly />
        <p>{ratingValue.toFixed(1)} estrelas</p>
        <p>{produto.qtdAvaliacoes} avaliações</p>
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

      <button onClick={() => handleAdicionarCarrinho(id)}>
        Adicionar ao Carrinho
      </button>
    </>
  );
}

export default ProdutoEspecifico