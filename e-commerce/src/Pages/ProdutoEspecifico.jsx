import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { api } from "../api/api"

const ProdutoEspecifico = () => {
  const { id } = useParams()
  const [produto, setProduto] = useState({})

  useEffect(() => {
    getProductById()
  }, [])

  const getProductById = async () => {
    const response = await api.get(`/produto/${id}`)
    setProduto(response.data)
    console.log(produto)
  }

  return (
    <>
      <h1>{produto.nome}</h1>
      <h3>{produto.descricao}</h3>
      <img src={produto.imgUrl} alt={produto.nome} />
      <p>{produto.descricao}</p>

      <p>R$ {produto.preco}</p>
      <button onClick={() => AdicionarCarrinho(id)}>
        Adicionar ao Carrinho
      </button>
    </>
    
  )
}

export default ProdutoEspecifico