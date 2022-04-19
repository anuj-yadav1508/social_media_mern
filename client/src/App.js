import React from 'react'
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom'
import Home from './pages/home/Home'
 import Profile from './pages/profile/Profile'
 import Login from './pages/login/Login'
import Register from './pages/register/Register';
import { useGlobalContext } from '../src/context/AuthContext'
import Messenger from './pages/messenger/Messenger'

function App() {
  const {user} = useGlobalContext()
  return (
    <Router>
      <Switch>
        <Route exact path='/'>
          {user ? <Home/> : <Register />}
        </Route>
        <Route path='/login'>
          {user ? <Redirect to='/' /> : <Login />}
        </Route>
        <Route path='/register'>
          {user ? <Redirect to='/' /> : <Register />}
        </Route>
        <Route path='/messenger'>
          {!user ? <Redirect to='/' /> : <Messenger />}
        </Route>
        <Route path='/profile/:username'>
          <Profile />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
