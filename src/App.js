import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout';
import Categories from './components/content/Categories';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Layout} />
        <Route exact path='/cate' component={Categories} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;