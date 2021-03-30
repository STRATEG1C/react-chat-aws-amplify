import { Auth } from 'aws-amplify';

class CognitoAuthProvider {
  async register(username, password, attributes = {}) {
    return await Auth.signUp({
      username,
      password,
      attributes
    });
  }

  async login(username, password) {
    return await Auth.signIn(username, password);
  }

  async logout() {
    return await Auth.signOut();
  }
}

export default CognitoAuthProvider;
