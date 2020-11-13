import React from "react";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import NavbarPage from './components/navbarpage.component';
import Maind from "./components/main.component"
import Profile from './components/profile.component'
import About from './components/about.component';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { Auth0Provider } from '@auth0/auth0-react'
import store from './store'
import { Provider } from 'react-redux';
require("dotenv").config();

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

function App() {
  return (
    <Provider store={store}>
      <Auth0Provider domain={domain} clientId={clientId} useRefreshTokens={true} redirectUri={window.location.origin}>
        <div className="App">
          <Router>
            <NavbarPage />
            <Route exact path="/" component={Maind} />
            <Route exact path="/view" component={Maind} />
            <Route path="/about" component={About} />
            <Route path="/profile" component={Profile} />
          </Router>
        </div>
      </Auth0Provider>
    </Provider>
  );
}

export default App;
