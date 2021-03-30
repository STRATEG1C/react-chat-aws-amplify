import { API, graphqlOperation } from 'aws-amplify';
import { getUser, listUsers } from '../graphql/queries';
import { createUser } from '../graphql/mutations';

class UserProvider {
  async create(data) {
    const res = API.graphql(graphqlOperation(createUser, { input: data }));
    return res.data.createUser;
  }

  async getById(id) {
    const res = API.graphql(graphqlOperation(getUser, { id }));
    return res.data.getUser;
  }

  async getList(by = null, limit = null) {
    const res = API.graphql(graphqlOperation(listUsers));
    const { items, nextToken } = res.data.listUsers;
    return {
      items,
      next: nextToken
    };
  }
}

export default UserProvider;
