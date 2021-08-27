

import {Container} from 'semantic-ui-react'
import {BrowserRouter as Router,Route,Switch,Link} from 'react-router-dom'


// pages
import Register from './components/Register'
import Login from './components/Login'
import Home from './components/Home'
import Header from './components/Header'


import 'semantic-ui-css/semantic.min.css'
import './App.css';

const App = () => {
  return (
    <div className="App"> 
      <Router>
        <Switch>
          <Container>
            <Header />
            <Route exact path = '/register' component = {Register}>
                <Register />
            </Route>
            <Route exact path = '/login' component = {Login}>
                <Login />
            </Route>
            <Route exact path = '/' component = {Home}>
                <Home />
            </Route>
          </Container>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
