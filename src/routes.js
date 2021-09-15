import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Repositorio from './pages/Repositorio';

export default function Routes(){
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/repositorio/:repositorio" component={Repositorio} />
            </Switch>
        </BrowserRouter>
    );
}