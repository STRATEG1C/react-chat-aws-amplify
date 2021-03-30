class AuthService {
  _provider;

  constructor(authProvider) {
    this._provider = authProvider;
  }

  async register(username, password, attributes = {}) {
    return this._provider.register(username, password, attributes = {});
  }

  async login(username, password) {
    return this._provider.login(username, password);
  }

  async logout() {
    return this._provider.logout();
  }
}

export default AuthService;
