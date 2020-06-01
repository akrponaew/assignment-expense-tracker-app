import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Layout from './components/Layout';
import ExpenseList from './components/content/ExpenseList';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Layout} />
        <Route exact path='/expense' component={ExpenseList} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;