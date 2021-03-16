import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Amplify } from 'aws-amplify';
import awsmobile from './aws-exports';
import store from './store';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './index.css';

const config = {
  ...awsmobile,
  Auth: {
    "region": "eu-central-1",
    "identityPoolRegion": "eu-central-1",
    "userPoolId": "eu-central-1_oPKyFJh5h",
    "userPoolWebClientId": "72au1vjhtq49mcelb47j09s1l",
    "mandatorySignIn": false,
    "authenticationFlowType": "USER_PASSWORD_AUTH"
  }
}

Amplify.configure(config);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
