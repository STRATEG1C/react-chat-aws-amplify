class ChatService {
  _provider;

  constructor(provider) {
    this._provider = provider;
  }

  async create(initiator, recipient) {
    return this._provider.create(initiator, recipient);
  }

  async getById(id) {
    return this._provider.getById(id);
  }

  async getMessagesByChatId(chatId) {
    return this._provider.getMessagesByChatId(chatId);
  }

  async getList(by, limit) {
    return this._provider.getList(by, limit);
  }
}

export default ChatService;
