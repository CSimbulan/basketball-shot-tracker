import React from "react";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import NavbarPage from "./components/navbarpage.component";
import Main from "./components/main.component"
import Maindiv from "./components/maindiv.component"
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
require('dotenv').config();

function App() {
  return (
    <div className="App">
      <Router>
        <NavbarPage />
        <Route exact path="/" component={Main} />
        <Route path="/about" component={Maindiv} />
      </Router>

    </div>
  );
}

export default App;
