import { useEffect, useState } from "react";
import Botao from "../Buttons/Buttons";
import Form from "../Forms/forms";
import api from "../../api/api";

const CadastroUsuario = ()=>{
     const [nome, setNome] = useState('');
     const [email, setEmail] = useState('');
     const [senha, setSenha] = useState('');
     const [usuarios, setUsuarios] = useState([]);

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

     const getAll = async()=>{
        const response = await api().get('/users');
        setUsuarios(response.data)
     }


    const handleNome=(e)=>{
         setNome(e.target.value);
     }
    const handleEmail=(e)=>{
        setEmail(e.target.value);
    }
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
                setNome('');
                setEmail('');
                setSenha('');
        }
                
             
        

    }

    return(
        <>
           
               {Form(nome,"Nome",handleNome)}
               {Form(email,"E-mail",handleEmail)}
               {Form(senha,"Senha",handleSenha)}
               {Botao("Cadastro", handleClick)}
            
        </>
    )
}
export default CadastroUsuario;