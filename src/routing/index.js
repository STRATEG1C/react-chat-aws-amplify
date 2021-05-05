import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import {
  CHAT,
  FEED,
  LOGIN,
  REGISTER
} from '../constants/pathNames';
import Login from '../components/screens/auth/Login';
import AuthenticatedRoute from '../components/common/AuthenticatedRoute';
import Register from '../components/screens/auth/Register';
import Feed from '../components/screens/Feed';

const Routing = () => {
  return (
    <Router>
      <Switch>
        <Route exact path={LOGIN} component={Login} />
        <Route exact path={REGISTER} component={Register} />
        <AuthenticatedRoute exact path={FEED} component={Feed} />
        <AuthenticatedRoute exact path={CHAT} component={Feed} />
      </Switch>
    </Router>
  );
}

export default Routing;
