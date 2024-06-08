import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../api/api"
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Typography from '@mui/material/Typography';

const ProdutoEspecifico = () => {
  const { id } = useParams()
  const [produto, setProduto] = useState({})
  const [ratingValue, setRatingValue] = useState(2);

  useEffect(() => {
    getProductById()
  }, [])

  const getProductById = async () => {
    const response = await api.get(`/produto/${id}`)
    setProduto(response.data)
    setRatingValue(response.data.avaliacao)
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
        <Typography component="legend">Avaliação média</Typography>
        <Rating name="read-only" value={ratingValue} readOnly />
      </Box>

      <button onClick={() => AdicionarCarrinho(id)}>
        Adicionar ao Carrinho
      </button>
    </>
  );
}

export default ProdutoEspecifico