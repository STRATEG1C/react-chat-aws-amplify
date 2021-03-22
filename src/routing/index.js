import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../components/screens/Login';
import AuthenticatedRoute from '../components/common/AuthenticatedRoute';
import PostsPage from '../components/screens/PostsPage';
import ChatList from '../components/screens/ChatList';
import Register from '../components/screens/Register';

const Routing = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <AuthenticatedRoute exact path="/" component={ChatList} />
        <AuthenticatedRoute exact path="/posts" component={PostsPage} />
      </Switch>
    </Router>
  );
}

export default Routing;
