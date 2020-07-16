import 'bootstrap/dist/css/bootstrap.min.css';
import './Css/App.css';
import './Css/Logos.css';
import './Css/NavBar.css';
import './Css/KeyFrames.css';
import 'react-vis/dist/style.css';

import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { MainPage } from './Pages/home';
import { LoginForm } from './Components/LoginForm';
import { Profuels } from './Pages/profuels'

import {
    BrowserRouter as Router, Switch, Route
} from "react-router-dom";

ReactDOM.render(

    <Router>
        <Switch>
            <Route path='/' component={LoginForm} exact />
            <Route path='/home' component={MainPage} exact />
            <Route path='/profuels' component={Profuels} exact />
        </Switch>
        <App />
    </Router>,
    document.getElementById('root')

);