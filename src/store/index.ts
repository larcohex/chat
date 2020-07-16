import Vue from "vue";
import Vuex, { Store } from "vuex";
import User from "@/types/user";
import Message from "@/types/message";

Vue.use(Vuex);

class State {
  user: User | null = null;
  messages: Message[] = [];
}

export default new Vuex.Store({
  state: new State(),
  getters: {
    getMessages: (state: State) => (filters: { user1: User; user2: User }) =>
      state.messages.filter(
        message =>
          (message.from.username === filters.user1.username &&
            message.to.username === filters.user2.username) ||
          (message.from.username === filters.user2.username &&
            message.to.username === filters.user1.username)
      )
  },
  mutations: {
    setUser: (state: State, newUser: User) => (state.user = newUser),
    sendMessage: (state: State, message: Message) =>
      state.messages.push(message)
  }
});
