import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout';
import Categories from './components/content/_Categories';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import _table from './components/_table';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={SignIn} />
        <Route path='/main' component={Layout} />
        <Route path='/signup' component={SignUp} />
        <Route path='/table' component={_table} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;