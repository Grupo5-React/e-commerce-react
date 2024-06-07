import { useEffect, useRef, useState } from 'react';
import './App.css';
import Produto from './Pages/Produto';
import { api } from './api/api';
import {FaUser, FaLock} from 'react-icons/fa'
import Login from './Components/Login/Login'
import CadastroUsuario from './Components/CadastroUsuario/CadastroUsuario.jsx'

function App() {
  const [dados, setDados] = useState([]);
  const [pesquisa, setPesquisa] = useState('');
  const inputRef = useRef();

  useEffect(() => {
    getAll();
  }, []);

  async function getAll() {
    const response = await api.get('/produto');
    const produtoFiltrado = response.data.filter(
      (produto) => produto.quantidade > 0,
    );
    setDados(produtoFiltrado);
  }

  function handleClick() {
    setPesquisa(inputRef.current.value);
  }

  return (
    <>
      <div className='App'>
      <Login/>
      </div>
      <input type="text" ref={inputRef} />
      <button onClick={handleClick}>Pesquisar</button>
      {pesquisa
        ? dados
            .filter((produto) => produto.nome.startsWith(pesquisa))
            .map((dado) => (
              <Produto
                key={dado.id}
                img={dado.imgUrl}
                nome={dado.nome}
                descricao={dado.descricao}
                preco={dado.preco}
                categoria={dado.ategoria}
                quantidade={dado.quantidade}
              />
            ))
        : dados.map((dado) => (
            <Produto
              key={dado.id}
              img={dado.imgUrl}
              nome={dado.nome}
              descricao={dado.descricao}
              preco={dado.preco}
              categoria={dado.ategoria}
              quantidade={dado.quantidade}
            />
          ))}
    </>
  );
}
export default App;
