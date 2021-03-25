import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser, selectCurrentUser } from '../../../store/Auth';
import { Auth } from 'aws-amplify';

const PageWrapper = ({ title, children }) => {
  const currentUser = useSelector(state => selectCurrentUser(state.auth));
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    document.title = title;
  }, [title]);

  const onLogOut = () => {
    dispatch(clearUser());
    Auth.signOut()
      .then(history.push('/login'));
  }

  return (
    <div className="page-wrapper">
      <div className="page-wrapper__header">
        <h1>{title}</h1>
        {currentUser ? <button onClick={onLogOut}>Log out</button> : <Link to="/login">Login</Link>}
      </div>
      {children}
    </div>
  )
}

PageWrapper.propTypes = {
  title: PropTypes.string.isRequired,

  // I've found it on StackOverflow :)
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}

export default PageWrapper;
