import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux'
import jwt_decode from 'jwt-decode'

import './App.css';

import Landingpage from './components/Landingpage/Landingpage';
import Header from './components/layout/Navbar'
import Signin from './components/auth/Signin';

import store from './store'
import setTokenToAuthHeader from './utilities/setTokenToAuthHeader';
import { setCurrentUser } from './actions/authActions';
import Footer from './components/layout/Footer';
import Dashboard from './components/Dashboard/Dashboard';
import CreateProfileRequired from './components/Dashboard/CreateProfileRequired';
import EditProfile from './components/Dashboard/EditProfile';
import Profile from './components/Profiles/Profile';
import PrivateRoute from './components/auth/PrivateRoute';
import NotFound from './components/NotFound/NotFound';
import PostFeed from './components/Posts/PostFeed';
import About from './components/About/About';

// Check if token in localStorage is active. If yes, persist decodedToken info (i.e., user) on page refresh
if (localStorage.jwtToken) {
  // Get token
  const { jwtToken } = localStorage
  // Set token to header
  setTokenToAuthHeader(jwtToken)
  // Decode token to get user
  const decodedToken = jwt_decode(jwtToken)
  // Set current user
  store.dispatch(setCurrentUser(decodedToken))

  // Check if token has expired
  const currentTime = Date.now() / 1000;
  if (decodedToken.exp < currentTime) {
    localStorage.removeItem('jwtToken')
    store.dispatch(setCurrentUser({}))
    window.location.href = '/'
  }
}

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Header />
          <div className="landing_background">
            <Switch>
              <Route exact path='/about' component={About} />
              <Route exact path="/" component={Landingpage} />
              <Route exact path="/signin" component={Signin} />
              <PrivateRoute exact path="/dashboard" component={Dashboard} />
              <PrivateRoute exact path="/edit-profile" component={EditProfile} />
              <PrivateRoute exact path="/create-profile" component={CreateProfileRequired} />
              <PrivateRoute exact path="/user/:username" component={Profile} />
              <PrivateRoute exact path="/feed" component={PostFeed} />
              <Route component={NotFound}></Route>
            </Switch>
          </div>
          <Footer />
        </div>
      </Router>
    </Provider>
  );
}

export default App;
