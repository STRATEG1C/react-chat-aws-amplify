import { API, graphqlOperation } from 'aws-amplify';
import { getUser, listUsers } from '../graphql/queries';
import { getUser as newCallForGetUser } from '../components/common/ChatList/queries';
import { createUser } from '../graphql/mutations';

class UserProvider {
  async create(data) {
    const res = await API.graphql(graphqlOperation(createUser, { input: data }));
    return res.data.createUser;
  }

  async getById(id) {
    const res = await API.graphql(graphqlOperation(newCallForGetUser, { id }));
    return res.data.getUser;
  }

  async getList(filter = null, limit = null) {
    const res = await API.graphql(graphqlOperation(listUsers, { filter, limit }));
    return res.data.listUsers;
  }
}

export default UserProvider;
