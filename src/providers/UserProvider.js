import { API, graphqlOperation } from 'aws-amplify';
import { getUser, listUsers } from '../graphql/queries';
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
    const { items, nextToken } = res.data.listUsers;
    return {
      items,
      next: nextToken
    };
  }
}

export default UserProvider;
