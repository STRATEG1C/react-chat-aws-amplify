import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../components/screens/Login';
import AuthenticatedRoute from '../components/common/AuthenticatedRoute';
import Register from '../components/screens/Register';
import Feed from '../components/screens/Feed';

const Routing = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <AuthenticatedRoute exact path="/" component={Feed} />
        <AuthenticatedRoute exact path="/:chatId" component={Feed} />
      </Switch>
    </Router>
  );
}

export default Routing;
