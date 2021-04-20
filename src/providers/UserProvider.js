import { API, graphqlOperation } from 'aws-amplify';
import { getUser, listUsers, searchUsers } from '../graphql/queries';
import { createUser } from '../graphql/mutations';

class UserProvider {
  async create(data) {
    const res = await API.graphql(graphqlOperation(createUser, { input: data }));
    return res.data.createUser;
  }

  async getById(id) {
    const res = await API.graphql(graphqlOperation(getUser, { id }));
    return res.data.getUser;
  }

  async getList(filter = null, limit = null) {
    const res = await API.graphql(graphqlOperation(listUsers, { filter, limit }));
    return res.data.listUsers;
  }

  async searchUser(username, nextToken) {
    const res = await API.graphql(graphqlOperation(searchUsers, {
      filter: { username: { wildcard: `${username}*` } },
      limit: 10,
      nextToken
    }));
    return res.data.searchUsers;
  }
}

export default UserProvider;
