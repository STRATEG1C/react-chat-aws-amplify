import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../../../store/Auth';
import PageWrapper from '../../common/PageWrapper';
import TextInput from '../../common/TextInput';
import Button from '../../common/Button';

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loginForm: {
        email: '',
        password: ''
      },
      formErrors: {
        email: '',
        password: ''
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.user !== this.props.user) {
      // this.props.history.push('/');
    }
  }

  onFormChange = (field, value) => {
    this.setState(prevState => ({
      ...prevState,
      loginForm: {
        ...prevState.loginForm,
        [field]: value
      },
      formErrors: {
        ...prevState.formErrors,
        [field]: ''
      }
    }))
  }

  onLogin = () => {
    this.props.onLogin(this.state.loginForm);
  }

  render() {
    const { loginForm, formErrors } = this.state;
    const { isError } = this.props;

    return (
      <PageWrapper title="Login">
        <div className="login-form">
          <TextInput
            label="Email"
            value={loginForm.email}
            onChange={this.onFormChange}
            name="email"
            error={formErrors.email}
          />
          <TextInput
            label="Password"
            type="password"
            value={loginForm.password}
            onChange={this.onFormChange}
            name="password"
            error={formErrors.password}
          />
          <Button
           onClick={this.onLogin}
           text="Log in"
          />
          {isError && <p className="error">Invalid credentials</p>}
        </div>
      </PageWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  isError: state.auth.isError,
  user: state.auth.user,
});

const mapDispatchToProps = {
  onLogin: login
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
