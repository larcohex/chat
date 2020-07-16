<template>
  <div
    class="chat"
    :class="{ chat_duplicate: isDuplicate }"
    @click="hideContacts"
  >
    <div class="contacts">
      <div
        class="contact"
        v-for="(contact, index) in contacts"
        :key="index"
        @click="selectReceiver(contact)"
      >
        <!-- i know that index should not be the key here but its for demonstration only -->
        <div
          class="avatar"
          :style="{ backgroundImage: 'url(' + contact.avatar + ')' }"
        ></div>
        <label class="contact__name">{{ contact.username }}</label>
      </div>
    </div>
    <div class="chat__body">
      <header class="chat__header">
        <div class="flex items-center" @click.stop="showContacts">
          <div
            class="avatar cursor-default"
            :style="{ backgroundImage: 'url(' + to.avatar + ')' }"
          ></div>
          <label class="contact__name cursor-default">{{ to.username }}</label>
        </div>
        <div class="chat__contacts" v-show="areContactsShown">
          <div
            class="contact"
            v-for="(contact, index) in contacts"
            :key="index"
            @click.stop="selectReceiver(contact)"
          >
            <!-- i know that index should not be the key here but its for demonstration only -->
            <div
              class="avatar"
              :style="{ backgroundImage: 'url(' + contact.avatar + ')' }"
            ></div>
            <label class="contact__name">{{ contact.username }}</label>
          </div>
        </div>
      </header>
      <section class="chat__messages">
        <div
          class="chat__message"
          v-for="(message, index) in messages"
          :key="index"
          :class="{
            chat__message_received: message.from.username !== from.username
          }"
        >
          <!-- i know that index should not be the key here but its for demonstration only -->
          <p class="chat__message-text">{{ message.text }}</p>
        </div>
      </section>
      <footer class="chat__footer">
        <form class="form" @submit.prevent="submitMessage()">
          <div class="form__input-container w-full">
            <input
              class="form__input"
              type="text"
              placeholder="Ваше сообщение"
              aria-label="Message"
              v-model="message"
            />
            <button class="btn" type="submit">
              Отправить
            </button>
          </div>
        </form>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from "vue-property-decorator";
import { Getter, Mutation } from "vuex-class";
import User from "@/types/user";
import Message from "@/types/message";

@Component
export default class Messenger extends Vue {
  @Getter
  getMessages!: (filters: { user1: User; user2: User }) => Message[];
  @Mutation sendMessage!: (message: Message) => void;

  @Prop({ required: true, type: Array }) readonly contacts!: User[];
  @Prop({ required: true, type: Object }) readonly from!: User;
  @Prop({ default: false, type: Boolean })
  readonly isDuplicate!: boolean;

  private to = this.contacts.find(
    contact => contact.username !== this.from.username
  );
  private areContactsShown = false;
  private message = "";

  get messages(): Message[] {
    if (this.to) {
      return this.getMessages({ user1: this.from, user2: this.to });
    } else {
      return [];
    }
  }

  public showContacts() {
    this.areContactsShown = true;
  }

  public hideContacts() {
    this.areContactsShown = false;
  }

  public selectReceiver(user: User) {
    this.to = user;
    this.hideContacts();
  }

  public submitMessage() {
    if (this.to) {
      this.sendMessage({
        from: this.from,
        to: this.to,
        text: this.message
      });
      this.message = "";
    }
  }

  @Watch("from") fromChanged(newFrom: User) {
    this.$forceUpdate();
  }
}
</script>

<style scoped>
.chat {
  @apply w-full h-full flex p-4;
}

.chat__body {
  @apply flex-auto flex flex-col;
}

.chat__header,
.chat__messages,
.chat__footer {
  @apply w-full;
}

.chat__header,
.chat__footer {
  @apply flex-initial;
}

.chat__header {
  @apply flex justify-center items-center border-b-2 border-teal-500 border-dashed p-2 relative;
  z-index: 2;
}

.chat__contacts {
  @apply absolute shadow-lg p-2 bg-white;
  top: 3.5rem;
  z-index: 3;
}

.chat__messages {
  @apply flex-auto flex flex-col p-2;
}

.chat__message {
  max-width: 80%;
  @apply inline-block rounded shadow-lg px-4 py-2 self-end mt-2;
}

.chat__message:first-child {
  @apply mt-0;
}

.chat__message_received {
  @apply bg-teal-100 self-start;
}

.chat__footer {
  @apply border-t-2 border-teal-500 border-dashed p-2;
}

.contacts {
  @apply hidden w-64 h-full border-r-2 border-teal-500 border-dashed p-4;
}

.contact {
  @apply flex items-center cursor-pointer mt-2;
}

.contact:first-child {
  @apply mt-0;
}

.contact__name {
  @apply ml-4 transition-colors duration-300 ease-out cursor-pointer;
}

.contact:hover .contact__name {
  @apply text-teal-500;
}

.chat_duplicate {
  @apply hidden;
}

@media (min-width: 768px) {
  .contacts {
    @apply block;
  }

  .chat__contacts {
    @apply hidden;
  }
}

@media (min-width: 1024px) and (orientation: landscape) {
  .chat {
    @apply w-1/2;
  }

  .chat_duplicate {
    @apply flex border-l-2 border-teal-500;
  }
}
</style>
