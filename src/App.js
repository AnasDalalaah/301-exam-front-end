import React from 'react';
import Home from './components/Home'
import Header from './components/Header';
import Footer from './components/Footer';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import { withAuth0 } from '@auth0/auth0-react';
import LogoutButton from './LogoutButton'

import Login from './Login'

class App extends React.Component {

  render() {
    console.log('app', this.props);
    const { isAuthenticated } = this.props.auth0;
    return(
      <>
        <Router>
            <Header />
            <Switch>
              <Route exact path="/">
                {/* TODO: if the user is logged in, render the `Home` component, if they are not, render the `Login` component */}
                {this.props.auth0.isAuthenticated? <Home/> : <Login/>}
              </Route>
              <Route exact path="/favFlowers">
                {/* TODO: if the user is logged in, render the `FavFlowers` component, if they are not, render the `Login` component */}
                {this.props.auth0.isAuthenticated && (
                  <>
                 
                    <favFlowers />
                  </>
                )}
              </Route>
            </Switch>
            <Footer />
        </Router>
      </>
    );
  }
}

export default withAuth0(App);
