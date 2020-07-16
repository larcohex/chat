<template>
  <div class="app">
    <header class="header">
      <button class="btn" @click="toggleAuthor">
        Сменить автора чата
      </button>
    </header>
    <div class="chats">
      <Messenger :contacts="contacts" :from="from" />
      <Messenger
        :contacts="contacts"
        :from="ivan"
        :is-duplicate="true"
      ></Messenger>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { State } from "vuex-class";
import User from "@/types/user";
import Messenger from "@/components/Messenger.vue";

const ivan: User = {
  username: "Иван Иванов",
  avatar: `${process.env.BASE_URL}assets/avatar.jpg`
};
@Component({
  components: { Messenger }
})
export default class Chat extends Vue {
  @State user!: User;

  private contacts: User[] = [ivan];
  private ivan = ivan;
  private from: User | undefined;

  toggleAuthor() {
    this.from =
      this.from?.username === this.user.username
        ? ivan
        : { username: this.user.username, avatar: this.user.avatar };
    this.$forceUpdate();
  }

  beforeMount() {
    this.from = { username: this.user.username, avatar: this.user.avatar };
    this.contacts.unshift({ ...this.user });
  }
}
</script>

<style scoped>
.app {
  @apply h-full w-full flex flex-col;
}

.chats {
  @apply w-full flex-auto flex;
}

.header {
  @apply flex justify-center p-2;
}

@media (min-width: 1024px) and (orientation: landscape) {
  .header {
    @apply hidden;
  }
}
</style>
