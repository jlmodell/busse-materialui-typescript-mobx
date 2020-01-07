import React from 'react';
import { observer } from "mobx-react";
import { Router, Link } from "@reach/router";

import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import MomentUtils from '@date-io/moment';

import { Auth } from './store/mobx'

import Login from "./pages/login";

const PublicRoutes = () => (
  <Router>
    <Home path="/" />
    <Login path="/login" />
  </Router>
);

const Home = observer(() => {
  const auth = Auth
  React.useEffect(() => {
    console.log(auth.token)
  })
  return (
    <div>
      <h1>Home Route</h1>
      <Link to="/login">Login</Link>
    </div>
  )
})

const App = observer(() => {
  return (
    <MuiPickersUtilsProvider utils={MomentUtils}>
      {/* <Layout> */}
      <PublicRoutes />
      {/* <PrivateRoutes /> */}
      {/* </Layout> */}
    </MuiPickersUtilsProvider>
  );
})

export default App;
