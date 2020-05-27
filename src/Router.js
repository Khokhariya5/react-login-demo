import React, {Component} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from "react-redux";
import { withRouter } from "react-router";

import App from './App';

import ListCity from './components/City/ListCity';
import Login from './components/Login/Login';
import Public from './components/Public';
import Register from './components/Register/Register';

import Protected from './components/Protected';

import Auth from './Auth';

const Router = (props) => (

    <Switch>
      
      <Route exact path='/login' component={Login}/>
      <Route exact path='/Register' component={Register}/>
      <PrivateRoute path="/cities" component={ListCity} />
      <PrivateRoute exact path='/' component={ListCity}/>

    </Switch>

)

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={props =>
      JSON.parse(localStorage.getItem('state')) && JSON.parse(localStorage.getItem('state')).authData && JSON.parse(localStorage.getItem('state')).authData.email && JSON.parse(localStorage.getItem('state')).authData.authToken ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/login"
          }}
        />
      )
    }
  />
);


export default Router;