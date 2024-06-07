

import { useState } from 'react';
import { FaUser, FaLock } from 'react-icons/fa';
import './Login.css';
import { api } from '../../api/api';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usuarios, setUsuarios] = useState('');

  const getUsuarios = async () => {
    const response = await api().get('/users');
    setUsuarios(response.data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Dados de Login:', { username, password });
  };

  const handleVerificacao = () => {
    getUsuarios();
    if (
      !usuarios.find(
        (usuario) => usuario.nome == username && usuario.senha == password,
      )
    ) {
      alert('Usuário ou senha incorretos!!');
      return;
    }
    alert('Login realizado com sucesso');
  };

  return (

    <section className="Login"> 
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Acesse o sistema</h1>
          <div className="input-field">
            <input
              type="text"
              placeholder="E-mail"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-field">
            <input
              type="password"
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <FaLock className="icon" />
          </div>

          <div className="recall-forget">
            <label>
              <input type="checkbox" />
              Lembre de mim
            </label>
            <a href="#">Esqueceu sua senha?</a>
          </div>
          <button type="submit" onClick={handleVerificacao}>Login</button>
          <div className="signup-link">
            <p>
              Não tem uma conta? <a href="/CadastroUsuario">Registre-se</a>{" "}
            </p>
          </div>
        </form>
      </div>
    </section>   

  );
};

export default Login;
