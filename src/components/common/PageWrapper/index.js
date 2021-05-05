import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from '../../../store/Auth/thunks';
import { selectCurrentUser } from '../../../store/Auth';
import './style.scss';

const PageWrapper = ({ title, children }) => {
  const currentUser = useSelector(state => selectCurrentUser(state.auth));
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    document.title = title;
  }, [title]);

  const onSignOut = () => {
    dispatch(signOut());
    history.push('/login');
  }

  const moveToLogin = () => {
    dispatch(signOut());
    history.push('/login');
  }

  return (
    <div className="page-wrapper">
      <div className="page-wrapper__header">
        <h1>{title}</h1>
        {currentUser
          ? <button data-testid="logout-btn" onClick={onSignOut}>Log out</button>
          : <button data-testid="login-btn" onClick={moveToLogin}>Login</button>}
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
