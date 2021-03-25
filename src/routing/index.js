import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../components/screens/Login';
import AuthenticatedRoute from '../components/common/AuthenticatedRoute';
import PostsPage from '../components/screens/PostsPage';
import Register from '../components/screens/Register';
import Feed from '../components/screens/Feed';
import ChatRoom from '../components/screens/ChatRoom';

const Routing = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Route exact path="/register" component={Register} />
        <AuthenticatedRoute exact path="/" component={Feed} />
        <AuthenticatedRoute exact path="/posts" component={PostsPage} />
        <AuthenticatedRoute exact path="/chat/:chatId" component={ChatRoom} />
      </Switch>
    </Router>
  );
}

export default Routing;
