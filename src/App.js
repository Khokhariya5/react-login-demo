import React, { Component } from 'react';
import './App.css';
import  Header from './components/Header';
import Router from './Router';

import { createStore, applyMiddleware , compose} from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
// middlewares
import thunkMiddleware from 'redux-thunk'
//import logger from 'redux-logger'
import reducer from './store/reducer';



const  loadState =() =>{

  try{
      const serializedState = localStorage.getItem('state');
      if(serializedState){


          var temp =  JSON.parse(serializedState);
          
          return temp

      }
      else{
          return undefined;
      }

  }
  catch(err){
      return err;
  }

}
let persistedState = loadState();

const store = createStore(reducer, persistedState, compose(
  applyMiddleware(thunkMiddleware),

  //For working redux dev tools in chrome (https://github.com/zalmoxisus/redux-devtools-extension)
  window.devToolsExtension ? window.devToolsExtension() : function (f) {
      return f;
  }
));

class App extends Component {
  render() {
    return (
      <div className="">
        <Provider store={store}>
          <Router/>
        </Provider>
          
      </div>
    );
  }
}



 const saveState = (state) =>{

  try{
     const serializedState = JSON.stringify(state);
     localStorage.setItem('state',serializedState);
  }
  catch(err){
     
  }
  
}

export default App;
