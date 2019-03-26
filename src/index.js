import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Aulas from './Aulas'
import Turmas from './Turmas'
import Eventos from './Eventos'
import Desafios from './Desafios'
import Atividades from './Atividades'
import * as serviceWorker from './serviceWorker';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import CriarConta from './CriarConta';

ReactDOM.render(
    <BrowserRouter>
        <Switch>
            <Route path="/" exact={true} component={App }/>
            <Route path="/atividades" exact={true} component={Atividades }/>
            <Route path="/aulas" exact={true} component={Aulas }/>
            <Route path="/desafios" exact={true} component={Desafios }/>
            <Route path="/eventos" exact={true} component={Eventos }/>
            <Route path="/turmas" exact={true} component={Turmas}/>
            <Route path="/criarconta" exact={true} component={CriarConta}/>

        </Switch>
    </BrowserRouter>, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
