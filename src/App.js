import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import TopBar from './components/TopBar'
import Main from './pages/Main'
import Home from './pages/Main';
import Training from './pages/Training';
import Mypage from './pages/Main';
import Search from './pages/Search';
import SignUp from './pages/SignUp';
import LogIn from './pages/LogIn';

function App() {
  return (
    <Router>
      <TopBar />
      <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/training' component={Training} />
          <Route path='/mypage' component={Mypage} />
          <Route path='/Search' component={Search} />
          <Route path='/login' component={LogIn} />
          <Route path='/signup' component={SignUp} />
        </Switch>
    </Router>
  );
}

export default App;