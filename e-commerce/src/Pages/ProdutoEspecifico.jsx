import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../api/api"
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

const ProdutoEspecifico = () => {
  const { id } = useParams()
  const [produto, setProduto] = useState({})
  const [ratingValue, setRatingValue] = useState(0)
  const [isRated, setIsRated] = useState(false)
  const [userRating, setUserRating] = useState(0)

  useEffect(() => {
    getProductById()
  }, [])

  const getProductById = async () => {
    const response = await api.get(`/produto/${id}`)
    setProduto(response.data)
    setRatingValue(response.data.avaliacaoTotal / response.data.qtdAvaliacoes)
  }

  const setRating = async (newRating) => {


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
        {
          !isRated ?
          <>
            <Typography component="legend">Sua avaliação sobre este produto</Typography>
            <Rating
              name="simple-controlled"
              value={ratingValue}
              onChange={(event, newRating) => {
                setRating(newRating)
                setIsRated(true)
                setUserRating(newRating)
              }}
            />
          </>
          :
          <>
            <Typography component="legend">Obrigado por avaliar este produto!</Typography>
            <Rating name="disabled" value={userRating} disabled />
          </>
        }
      </Box>

      <button onClick={() => AdicionarCarrinho(id)}>
        Adicionar ao Carrinho
      </button>
    </>
  );
}

export default ProdutoEspecifico