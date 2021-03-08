import 'bootstrap/dist/css/bootstrap.min.css';
// import 'semantic-ui-css/semantic.min.css'
import './Css/App.css';
import './Css/Logos.css';
import './Css/NavBar.css';
import './Css/KeyFrames.css';
import 'react-vis/dist/style.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { Landing } from './Pages/Default/home';
import { login } from './Pages/Default/login';
import Profuels from './Pages/Profuels/main'
import Estadocuentaprofuels from './Pages/Profuels/estadodecuenta'
import Auxiliardemovimiento from './Pages/Profuels/auxiliardemovimiento'
import AntiguedadDeSaldos from './Pages/Profuels/antiguedaddesaldos'
import Informedesaldos from './Pages/Profuels/informedesaldos'
import { Reportes } from './Pages/Reportes/ControlVol';
import {
    BrowserRouter as Router, Switch, Route
} from "react-router-dom";

ReactDOM.render(

    <Router>
        <Switch>
            <Route path={`/`} component={login} exact />
            <Route path={`/home`} component={Landing} exact />
            <Route path={`/profuels`} component={Profuels} exact />
            <Route path={`/reportes`} component={Reportes} exact />
            <Route path={`/profuels/estadodecuenta`} component={Estadocuentaprofuels} exact />
            <Route path={`/profuels/auxiliardemovimientos`} component={Auxiliardemovimiento} exact />
            <Route path={`/profuels/antiguedaddesaldos`} component={AntiguedadDeSaldos} exact />
            <Route path={`/profuels/informedesaldos`} component={Informedesaldos} exact />
        </Switch>
        <App></App>
   </Router>  
    ,
    document.getElementById('root')

);