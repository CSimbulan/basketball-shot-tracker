import React from "react";
import {
  BrowserRouter as Router,
  Route,
} from "react-router-dom";
import NavbarPage from "./components/navbarpage.component";
import Maindiv from "./components/maindiv.component"
import Profile from './components/profile.component'
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';
import { Auth0Provider } from '@auth0/auth0-react'
import store from './store'
import { Provider } from 'react-redux';

const domain = process.env.REACT_APP_AUTH0_DOMAIN;
const clientId = process.env.REACT_APP_AUTH0_CLIENT_ID;

function App() {
  return (
    <Provider store={store}>
      <Auth0Provider domain={domain} clientId={clientId} redirectUri={window.location.origin}>
        <div className="App">
          <Router>
            <NavbarPage />
            <Route exact path="/" component={Maindiv} />
            <Route path="/about" component={Maindiv} />
            <Route path="/profile" component={Profile} />
          </Router>
        </div>
      </Auth0Provider>
    </Provider>
  );
}

export default App;
