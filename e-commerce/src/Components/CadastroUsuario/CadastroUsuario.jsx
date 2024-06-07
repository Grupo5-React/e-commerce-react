
import { useEffect, useState } from "react";
import "./CadastroUsuario.css"
import Botao from "../Buttons/Buttons";
import Form from "../Forms/forms";
import { api } from '../../api/api';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";




const CadastroUsuario = () => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [usuarios, setUsuarios] = useState([]);


     const history = useHistory()

     const postUsuario = async() =>{
       await api().post('/users',{
            nome,
            email,
            senha
        })
     }
     useEffect(()=>{
        getAll();
     },[email])

 

  const getAll = async () => {
    const response = await api.get('/users');
    setUsuarios(response.data);
  };

  const handleNome = (e) => {
    setNome(e.target.value);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  
    const handleSenha=(e)=>{
        setSenha(e.target.value);
    }
    const handleClick = () =>{
        getAll();
        if (usuarios.find(usuario => usuario.email == email)) {
            alert("E-mail já cadastrado!! Por Favor utilize outro.");
            return;
        }else{
            postUsuario();
                alert("Cadastro realizado com Sucesso!!")
                history.push('/Login')
        }
                
             
        

    }

    return(
        <>
        <div className="C">        
           <form action="" >
               {Form(nome,"Nome",handleNome)}
               <br />
               {Form(email,"E-mail",handleEmail)}
               <br />
               {Form(senha,"Senha",handleSenha)}
               <br />
               {Botao("Cadastro", handleClick)}
            </form>
        </div>   
        </>
    )
}

export default CadastroUsuario;