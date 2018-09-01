import React from 'react'
import ReactDom from 'react-dom'
import {createStore,applyMiddleware,compose} from 'redux'
import thunk from 'redux-thunk'
import {BrowserRouter,Route,Switch} from 'react-router-dom'
import {Provider} from 'react-redux'

import Login from './login/login'
import Register from './register/register'
import AuthRoute from './authroute/authroute'
import reducer from './reducers'
import DashBoard from './component/dashboard/dashboard'
const store=createStore(reducer,compose(
  applyMiddleware(thunk),
  window.devToolsExtension?window.devToolsExtension():f=>f
))

ReactDom.render(
  (
    <Provider store={store}>
    <BrowserRouter>
    <div>
    <AuthRoute></AuthRoute>
    <Switch>
      <Route path='/' exact component={Login}></Route>
      <Route path='/login' component={Login} ></Route>
      <Route path='/register' component={Register} ></Route>
      <Route component={DashBoard} ></Route>
    </Switch>
    </div>
    </BrowserRouter>
    </Provider>
  ),
  document.getElementById('root')
)
