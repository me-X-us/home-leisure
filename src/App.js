import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import Home from './pages/Main';
import Training from './pages/Training';
import Mypage from './pages/Main';

function App() {
  return (
    <div className="Start">
      <Router>
        <div className='Menu-wrapper'>
          <ul>
            <Link to='/'><button>Home</button></Link>
            <Link to='/mypage'><button>MyPage</button></Link>
            <Link to='/training'><button>Training</button></Link>
          </ul>
          <ul>
          </ul>
        </div>
        <div className='Contents-wrapper'>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/mypage' component={Mypage} />
            <Route path='/training' component={Training} />
          </Switch>
        </div>
      </Router>
    </div>
  );
}

export default App;