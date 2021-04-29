import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Auth } from 'aws-amplify';
import { clearUser, selectCurrentUser } from '../../../store/Auth';
import './style.scss';

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

  const moveToLogin = () => {
    dispatch(clearUser());
    history.push('/login');
  }

  console.log(currentUser);

  return (
    <div className="page-wrapper">
      <div className="page-wrapper__header">
        <h1>{title}</h1>
        {currentUser ? <button onClick={onLogOut}>Log out</button> : <button onClick={moveToLogin}>Login</button>}
      </div>
      {children}
    </div>
  )
}

PageWrapper.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
}

export default PageWrapper;
