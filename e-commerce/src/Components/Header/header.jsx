import {Toolbar, Typography } from "@mui/material";

export default function Cabecalho(){

  // const handleClickLogin = () => {
  //   window.open('/login');
  // };
  // const handleClickLogin = () => {
  //   window.open('/login');
  // };
  // const handleClickLogin = () => {
  //   window.open('/login');
  // };
  // const handleClickLogin = () => {
  //   window.open('/login');
  // };
  // const handleClickLogin = () => {
  //   window.open('/login');
  // };

    return(
        <div>
      <Toolbar>
        <Typography variant="h6" component="div">
        </Typography>
        <nav>
          <button onClick={()=>{window.open('/login','_self');}}>Login</button>
          <button onClick={()=>{window.open('/cadastroUsuario', '_self');}}>Cadastro Usuario</button>
          <button onClick={()=>{window.open('/produtos', '_self');}}>Produtos</button>
          <button onClick={()=>{window.open('/produtos/hds', '_self');}}>HDS</button>
          <button onClick={()=>{window.open('/produtos/notebooks','_self');}}>Notebooks</button>
          <button onClick={()=>{window.open('/produtos/suprimentos','_self');}}>Suprimentos</button>
          <button onClick={()=>{window.open('/carrinho','_self');}}>Carrinho</button>
        </nav>
      </Toolbar>
      {/* O conteúdo do seu aplicativo vai abaixo da barra de ferramentas */}
      <div>
        {/* Seu conteúdo aqui */}
      </div>
    </div>
  );
}

