class UserService {
  _provider;

  constructor(provider) {
    this._provider = provider;
  }

  async create(data) {
    return this._provider.create(data);
  }

  async getById(id) {
    return this._provider.getById(id);
  }

  async getList(by = null, limit = null) {
    return this._provider.getList(by, limit);
  }
}

export default UserService;
