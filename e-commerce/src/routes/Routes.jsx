import { BrowserRouter, Route, Switch } from "react-router-dom";
import CadastroUsuario from "../Components/CadastroUsuario/CadastroUsuario";
import Login from "../Components/Login/Login";

const Rotas = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path='/' component ={Login} />
                <Route path='/CadastroUsuario' component ={CadastroUsuario} />
            </Switch>
        </BrowserRouter>
    );
};

export default Rotas;