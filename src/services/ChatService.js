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

  async getMessagesByChatId(chatId, limit) {
    return this._provider.getMessagesByChatId(chatId, limit);
  }

  async getList(by, limit) {
    return this._provider.getList(by, limit);
  }

  async createChatMessage(message) {
    return this._provider.createChatMessage(message);
  }
}

export default ChatService;
