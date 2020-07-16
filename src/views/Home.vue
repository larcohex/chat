<template>
  <form class="form" @submit.prevent="startChatting">
    <div class="form__input-container">
      <input type="file" id="avatar" class="hidden" @change="setAvatar" />
      <label
        for="avatar"
        class="avatar form__avatar"
        :class="{ 'border-dashed': !avatar }"
        :style="{ backgroundImage: avatar ? 'url(' + avatar + ')' : null }"
        >{{ avatar ? "" : "+" }}</label
      >
      <input
        class="form__input"
        type="text"
        placeholder="Никнейм"
        aria-label="Nickname"
        v-model="username"
        @input="markAsDirty"
      />
      <button class="btn form__btn" type="submit">
        Начать беседу
      </button>
    </div>
    <div class="mt-4">
      <p class="form__error" v-show="!username && isInputDirty">
        Введите Ваш никнейм
      </p>
      <p class="form__error" v-show="!avatar && wasSubmittedOnce">
        Выберите изображение для Вашего аватара
      </p>
    </div>
  </form>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { Mutation } from "vuex-class";
import User from "@/types/user";

@Component
export default class Home extends Vue {
  @Mutation setUser!: (user: User) => void;

  private isInputDirty = false;
  private wasSubmittedOnce = false;
  private username = "";
  private avatar: string | ArrayBuffer | null = null;

  public setAvatar({ target }: { target: HTMLInputElement }) {
    if (target.files?.[0]) {
      const reader = new FileReader();
      reader.readAsDataURL(target.files[0]);
      reader.onloadend = () => {
        this.avatar = reader.result;
      };
    }
  }

  public markAsDirty() {
    this.isInputDirty = true;
  }

  public startChatting() {
    if (this.username && this.avatar) {
      this.setUser({
        username: this.username,
        avatar: this.avatar
      });
      this.$router.replace("/chat");
    } else {
      this.wasSubmittedOnce = true;
    }
  }
}
</script>

<style scoped>
.form__error {
  @apply text-red-500;
}
</style>
