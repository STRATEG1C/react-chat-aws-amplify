import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { register } from '../../../../store/Auth/thunks';
import {
  EMPTY_FIELD,
  PASSWORD_MISMATCH
} from '../../../../constants/erorrs';
import { LOGIN } from '../../../../constants/pathNames';
import { selectAuthError } from '../../../../store/Auth';
import PageWrapper from '../../../common/PageWrapper';
import TextInput from '../../../common/TextInput';
import Button from '../../../common/Button';
import { toast } from 'react-toastify';

const initialForm = {
  email: '',
  username: '',
  password: '',
  repeatPassword: '',
};

const initialFormErrors = {
  email: '',
  username: '',
  password: '',
  repeatPassword: ''
}

const Register = () => {
  const [form, setForm] = useState(initialForm);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const history = useHistory();
  const isError = useSelector(state => selectAuthError(state));
  const dispatch = useDispatch();

  useEffect(() => {
    isError && toast(`Something went wrong`);
  }, [isError]);

  const onFormChange = (field, value) => {
    setFormErrors(prev => ({
      ...prev,
      [field]: ''
    }));

    setForm(prev => ({
      ...prev,
      [field]: value
    }));
  }

  const validateForm = () => {
    let emailError = false;
    let usernameError = false;
    let passwordError = false;
    let repeatPasswordError = false;

    if (!form.email.trim()) {
      emailError = true;
    }
    if (!form.username.trim()) {
      usernameError = true;
    }
    if (!form.password.trim()) {
      passwordError = true;
    }
    if (!form.repeatPassword.trim() || form.password.trim() !== form.repeatPassword.trim()) {
      repeatPasswordError = true;
    }

    setFormErrors({
      ...formErrors,
      email: emailError ? EMPTY_FIELD : '',
      username: usernameError ? EMPTY_FIELD : '',
      password: passwordError ? EMPTY_FIELD : '',
      repeatPassword: repeatPasswordError ? PASSWORD_MISMATCH : ''
    });

    return !emailError
      && !usernameError
      && !passwordError
      && !repeatPasswordError;
  }

  const onRegister = () => {
    if (validateForm()) {
      dispatch(register(form))
        .then(() => history.push(LOGIN));
    }
  }

  return (
    <PageWrapper title="Register">
      <div className="login-form">
        <TextInput
          label="Email"
          value={form.email}
          onChange={onFormChange}
          name="email"
          error={formErrors.email}
        />
        <TextInput
          label="Username"
          value={form.username}
          onChange={onFormChange}
          name="username"
          error={formErrors.username}
        />
        <TextInput
          label="Password"
          type="password"
          value={form.password}
          onChange={onFormChange}
          name="password"
          error={formErrors.password}
        />
        <TextInput
          label="Repeat password"
          type="password"
          value={form.repeatPassword}
          onChange={onFormChange}
          name="repeatPassword"
          error={formErrors.repeatPassword}
        />
        <Button
          onClick={onRegister}
          text="Register"
        />
        <Link to="/login">Login</Link>
      </div>
    </PageWrapper>
  )
}

export default Register;
