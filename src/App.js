import React from "react"
import {BrowserRouter as Router,Routes,Route} from "react-router-dom"
import Home from './components/Home'
import Login from './components/user/Login'
import Register from './components/user/Register'

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path='/' component={Home}/>
          <Route path='/login' component={Login} />
          <Route path='/register' component={Register}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
