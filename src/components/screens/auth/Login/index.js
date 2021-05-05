import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../../store/Auth/thunks';
import { selectAuthError } from '../../../../store/Auth';
import {
  INVALID_LOGIN,
  INVALID_PASSWORD
} from '../../../../constants/erorrs';
import { FEED } from '../../../../constants/pathNames';
import PageWrapper from '../../../common/PageWrapper';
import TextInput from '../../../common/TextInput';
import Button from '../../../common/Button';

const initForm = {
  email: '',
  password: '',
};

const initFormErrors = {
  email: '',
  password: '',
};

const Login = () => {
  const [form, setForm] = useState(initForm);
  const [formErrors, setFormErrors] = useState(initFormErrors);

  const history = useHistory();
  const dispatch = useDispatch();
  const isLoginError = useSelector(state => selectAuthError(state));

  useEffect(() => {
    if (isLoginError) {
      setFormErrors({
        email: INVALID_LOGIN,
        password: INVALID_PASSWORD,
      });
    }
  }, [isLoginError]);

  const onChangeForm = (field, value) => {
    setFormErrors({
      ...formErrors,
      [field]: ''
    });
    setForm({
      ...form,
      [field]: value
    });
  }

  const validateForm = () => {
    let loginError = false;
    let passwordError = false;

    if (!form.email.trim()) {
      loginError = true;
    }

    if (!form.password.trim()) {
      passwordError = true;
    }

    setFormErrors({
      ...formErrors,
      email: loginError ? INVALID_LOGIN : '',
      password: passwordError ? INVALID_PASSWORD : '',
    });

    return !loginError && !passwordError;
  }

  const onLogin = () => {
    if (!validateForm()) {
      return;
    }

    const { email, password } = form;

    dispatch(login({ email, password }))
      .then(() => history.push(FEED));
  };

  return (
    <PageWrapper title="Login">
      <div className="login-form">
        <TextInput
          label="Email"
          value={form.email}
          onChange={onChangeForm}
          name="email"
          error={formErrors.email}
        />
        <TextInput
          label="Password"
          type="password"
          value={form.password}
          onChange={onChangeForm}
          name="password"
          error={formErrors.password}
        />
        <Button
          onClick={onLogin}
          text="Log in"
        />
        <Link to="/register">Register</Link>
        {isLoginError && <p className="error">Invalid credentials</p>}
      </div>
    </PageWrapper>
  );
};

export default Login;
