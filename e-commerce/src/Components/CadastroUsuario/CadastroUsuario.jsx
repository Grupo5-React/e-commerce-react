import { useEffect, useState } from "react";
import "./CadastroUsuario.css";
import { api } from "../../api/api";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { FaLock, FaMailBulk, FaUser } from "react-icons/fa";

const CadastroUsuario = () => {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [usuarios, setUsuarios] = useState([]);

  const history = useHistory();

  const postUsuario = async () => {
    await api.post("/users", {
      nome,
      email,
      senha,
    });
  };
  useEffect(() => {
    getAll();
  }, [email]);

  const getAll = async () => {
    const response = await api.get("/users");
    setUsuarios(response.data);
  };

  const handleClick = () => {
    getAll();
    if (usuarios.find((usuario) => usuario.email == email)) {
      alert("E-mail já cadastrado!! Por Favor utilize outro.");
      return;
    } else {
      postUsuario();
      alert("Cadastro realizado com Sucesso!!");
      history.push("/Login");
    }
  };

  return (
    <>
      <section className="Login">
        <div className="container">
          <form>
            <h1>Faça seu cadastro</h1>
            <div className="input-field">
              <input
                type="text"
                placeholder="Nome"
                required
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
              <FaUser className="icon" />
            </div>
            <div className="input-field">
              <input
                type="text"
                placeholder="E-mail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FaMailBulk className="icon" />
            </div>
            <div className="input-field">
              <input
                type="password"
                placeholder="Senha"
                required
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
              />
              <FaLock className="icon" />
            </div>
            <div className="recall-forget"></div>
            <button type="submit" onClick={handleClick}>
              Login
            </button>
            <div className="signup-link"></div>
          </form>
        </div>
      </section>
    </>
  );
};

export default CadastroUsuario;
