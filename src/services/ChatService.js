class ChatService {
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

  async getMessagesByChatId(chatId, limit, page) {
    return this._provider.getMessagesByChatId(chatId, limit, page);
  }

  async getList(by, limit) {
    return this._provider.getList(by, limit);
  }

  async update(chatId, data) {
    return this._provider.update(chatId, data);
  }

  async createChatMessage(message) {
    return this._provider.createChatMessage(message);
  }

  subscribeToRoom(id, callback) {
    return this._provider.subscribeToRoom(id, callback);
  }

  subscribeToCreationNewRoom(userId, callback) {
    return this._provider.subscribeToCreationNewRoom(userId, callback);
  }

  subscribeToUpdateRoom(id, callback) {
    return this._provider.subscribeToUpdateRoom(id, callback);
  }
}

export default ChatService;
