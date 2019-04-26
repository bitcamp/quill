import { action, observable, computed } from 'mobx';
import * as UserService from '../services/UserService'
import * as EventService from '../services/EventService'

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

  @action getEvents = async () => {
    const eventRes = await EventService.getEvents();

    if(eventRes.ok) {
      const resJson = await eventRes.json();
      this.events = resJson;
    }
  }

  @action createEvent = async(eventInfo) => {
    const resp = await EventService.createEvent(this.rootStore.token, eventInfo);

    if(resp.ok) { this.getEvents(); }
  }

  @action updateEvent = async(eventInfo) => {
    const resp = await EventService.updateEvent(this.rootStore.token, eventInfo);

    if(resp.ok) { this.getEvents(); }
  }

  @action deleteEvent = async(id) => {
    const resp = await EventService.deleteEvent(this.rootStore.token, id);

    if(resp.ok) { this.getEvents(); }
  }

  constructor (rootStore) {
    this.rootStore = rootStore;
  }
}
