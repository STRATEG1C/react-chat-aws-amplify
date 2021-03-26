import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { register } from '../../../store/Auth';
import PageWrapper from '../../common/PageWrapper';
import TextInput from '../../common/TextInput';
import Button from '../../common/Button';

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

const Register = ({ onRegister, isError }) => {
  const [form, setForm] = useState(initialForm);
  const [formErrors, setFormErrors] = useState(initialFormErrors);

  const history = useHistory();

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

  const onSubmit = () => {
    !form.email.trim() && (formErrors.email = 'Field cannot be empty');
    !form.username.trim() && (formErrors.username = 'Field cannot be empty');
    !form.password.trim() && (formErrors.password = 'Field cannot be empty');
    !form.repeatPassword.trim() && (formErrors.repeatPassword = 'Field cannot be empty');
    (form.password.trim() !== form.repeatPassword.trim()) && (formErrors.repeatPassword = 'Passwords are different')

    if (
      !formErrors.email &&
      !formErrors.password &&
      !formErrors.repeatPassword
    ) {
      onRegister(form)
        .then(() => !isError && history.push('/login'));
    } else {
      setFormErrors(prev => ({
        ...prev
      }));
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
          onClick={onSubmit}
          text="Register"
        />
        <Link to="/login">Login</Link>
      </div>
    </PageWrapper>
  )
}

const mapStateToProps = (state) => ({
  isError: state.auth.isError
});

const mapDispatchToProps = {
  onRegister: register,
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
