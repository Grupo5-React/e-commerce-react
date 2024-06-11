import { useContext, useEffect, useState } from 'react';
import { FaUser, FaEye, FaEyeSlash } from 'react-icons/fa';
import './Login.css';
import { api } from '../../api/api';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import GlobalContext from '../../hooks/GlobalContext ';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [usuarios, setUsuarios] = useState('');
  const [visible, setVisible] = useState(false);
  const { rota } = useContext(GlobalContext);

  useEffect(() => {
    getUsuarios();
  }, []);

  const { usuarioLogado, setUsuarioLogado } = useContext(GlobalContext);

  const history = useHistory();

  const getUsuarios = async () => {
    const response = await api.get('/users');
    setUsuarios(response.data);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleVerificacao = () => {
    if (
      !usuarios.find(
        (usuario) => usuario.email == username && usuario.senha == password,
      )
    ) {
      alert('Usuário ou senha incorretos!!');
      return;
    } else {
      setUsuarioLogado(null);

      let usuarioEncontrado = null;
      usuarios.forEach((user) => {
        if (user.email === username && user.senha === password) {
          usuarioEncontrado = user;
        }
      });

      if (usuarioEncontrado) {
        setUsuarioLogado(usuarioEncontrado);
        alert('Login realizado com sucesso');
        if (rota != null) {
          history.push(rota.pathname);
        } else {
          history.push('/produtos');
        }
      } else {
        alert('Usuário não encontrado');
      }
      if (usuarioLogado) {
        alert(usuarioLogado.id);
      }
      // history.push('/produtos')
    }
  };

  return (
    <section className="Login">
      <div className="container">
        <form onSubmit={handleSubmit}>
          <h1>Acesse o sistema</h1>
          <div className="input-field">
            <input
              type="email"
              placeholder="E-mail"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <FaUser className="icon" />
          </div>
          <div className="input-field">
            <input
              type={visible ? 'text' : 'password'}
              placeholder="Senha"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <span
              className="button-show-password OlhoSenha"
              onClick={() => {
                setVisible(!visible);
              }}
            >
              {visible ? <FaEye /> : <FaEyeSlash />}
            </span>
          </div>

          <div className="recall-forget"></div>
          <button type="submit" onClick={handleVerificacao}>
            Login
          </button>
          <div className="signup-link">
            <p>
              Não tem uma conta? <a href="/CadastroUsuario">Registre-se</a>{' '}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Login;
