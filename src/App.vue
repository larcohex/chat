<template>
  <router-view />
</template>

<style>
@import "~tailwindcss/base.css";
@import "~tailwindcss/components.css";
@import "~tailwindcss/utilities.css";

html,
body {
  @apply h-full w-full;
}

.form {
  @apply h-full w-full flex flex-col justify-center items-center p-2;
}

.form__input-container {
  @apply flex items-center border-b border-b-2 border-teal-500 py-2;
}

.form__input {
  @apply appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight min-w-0;
}

.form__input:focus {
  @apply outline-none;
}

.form__avatar {
  @apply cursor-pointer;
}

.form__btn {
  @apply flex-shrink-0;
}

.btn {
  @apply bg-teal-500 border-teal-500 text-sm border-4 text-white py-1 px-2 rounded transition-colors duration-300 ease-out;
}

.btn:hover {
  @apply bg-teal-700 border-teal-700;
}

.avatar {
  @apply flex-shrink-0 flex justify-center items-center w-12 h-12 rounded-full border-2 border-teal-500 text-teal-500 text-2xl bg-cover transition-colors duration-300 ease-out;
}

.avatar:hover {
  @apply bg-teal-500 text-white;
}
</style>
