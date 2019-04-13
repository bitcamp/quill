import { action, observable, computed } from 'mobx';
import * as UserService from '../services/UserService'

export default class AdminStore {
  @observable stats = { dummyStat: 1 };
  @observable users = [];
  @observable events = [];

  @action fetchUsers = async (page, query) => {
    // TODO: implement
  }
}
