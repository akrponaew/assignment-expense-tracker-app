import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'
import Topbar from './components/Topbar';
import Main from './components/Main';

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path='/' component={Main} />
        <Route path='/topbar' component={Topbar} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;