class ChatService {
  _provider;

  constructor(provider) {
    this._provider = provider;
  }

  async createChatRoom(initiatorId, partnerId) {
    return this._provider.createChatRoom(initiatorId, partnerId);
  }

  async createUserConversation(userId, chatRoomId, isAccepted) {
    return this._provider.createUserConversation(userId, chatRoomId, isAccepted);
  }

  async getChatRoom(id) {
    return this._provider.getChatRoom(id);
  }

  async getUserConversations(userId) {
    return this._provider.getUserConversations(userId);
  }

  async getBannedChats(userId) {
    return this._provider.getBannedChats(userId);
  }

  async getUserConversation(userId, chatId) {
    return this._provider.getUserConversation(userId, chatId);
  }

  async getBlockedUserConversations(by, limit) {
    return this._provider.getBlockedUserConversations(by, limit);
  }

  async updateConversation(id, data) {
    return this._provider.updateConversation(id, data);
  }

  async getMessagesByChatId(chatId, limit, page) {
    return this._provider.getMessagesByChatId(chatId, limit, page);
  }

  async getChatRoomList(by, limit) {
    return this._provider.getChatRoomList(by, limit);
  }

  async updateChatRoom(chatId, data) {
    return this._provider.updateChatRoom(chatId, data);
  }

  async createChatMessage(chatId, userId, message) {
    return this._provider.createChatMessage(chatId, userId, message);
  }

  subscribeToChatRoom(id, callback) {
    return this._provider.subscribeToChatRoom(id, callback);
  }

  subscribeToCreateNewConversation(userId, callback) {
    return this._provider.subscribeToCreateNewConversation(userId, callback);
  }

  subscribeToUpdateRoomBySubscriberId(id, callback) {
    return this._provider.subscribeToUpdateRoomBySubscriberId(id, callback);
  }

  subscribeToUpdateRoomByInitiatorId(id, callback) {
    return this._provider.subscribeToUpdateRoomByInitiatorId(id, callback);
  }

  subscribeToUpdateOwnConversation(userId, callback) {
    return this._provider.subscribeToUpdateOwnConversation(userId, callback);
  }
}

export default ChatService;
