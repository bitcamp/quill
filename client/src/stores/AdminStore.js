import { action, observable, computed } from 'mobx';
import * as UserService from '../services/UserService'

export default class AdminStore {
  @observable stats = { dummyStat: 1 };

  @observable currentPage = 0;
  @observable numPages = 1;
  @observable users = [];
  

  @observable events = [];

  @action searchUsers = async (page, query, search) => {
    this.rootStore.loading = true;
    const searchResponse = await UserService.fetchUsers(this.rootStore.token, { text: '', page: 0, size: 50 });
    this.rootStore.loading = false;

    if (searchResponse.ok) {
      const searchJson = await searchResponse.json();
      this.users = searchJson.users;
    } else {
      this.rootStore.clearMessages();
      this.rootStore.messages.push({
        type: 'error',
        message: 'failed to search users',
      });
    }
  }

  constructor (rootStore) {
    this.rootStore = rootStore;
  }
}
