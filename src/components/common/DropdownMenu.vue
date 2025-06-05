<template>
  <div class="relative" v-click-outside="closeDropdown" ref="dropdown">
    <!-- Trigger -->
    <button @click="toggleDropdown" :class="buttonClass">
      <slot name="icon">
        <!-- Default icon -->
        <svg class="fill-current" width="24" height="24" viewBox="0 0 24 24">
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M5.99902 10.245C6.96552 10.245 7.74902 11.0285 7.74902 11.995V12.005C7.74902 12.9715 6.96552 13.755 5.99902 13.755C5.03253 13.755 4.24902 12.9715 4.24902 12.005V11.995C4.24902 11.0285 5.03253 10.245 5.99902 10.245ZM17.999 10.245C18.9655 10.245 19.749 11.0285 19.749 11.995V12.005C19.749 12.9715 18.9655 13.755 17.999 13.755C17.0325 13.755 16.249 12.9715 16.249 12.005V11.995C16.249 11.0285 17.0325 10.245 17.999 10.245ZM13.749 11.995C13.749 11.0285 12.9655 10.245 11.999 10.245C11.0325 10.245 10.249 11.0285 10.249 11.995V12.005C10.249 12.9715 11.0325 13.755 11.999 13.755C12.9655 13.755 13.749 12.9715 13.749 12.005V11.995Z"
          />
        </svg>
      </slot>
    </button>

    <!-- Menu -->
    <div v-if="open" :class="menuClass">
      <slot name="menu">
        <template v-for="(item, index) in menuItems" :key="index">
          <router-link
            v-if="item.to"
            :to="item.to"
            @click="() => handleMenuItemClick(item.onClick)"
            :class="itemClass"
          >
            {{ item.label }}
          </router-link>
          <button
            v-else
            @click="() => handleMenuItemClick(item.onClick)"
            :class="itemClass"
          >
            {{ item.label }}
          </button>
        </template>
      </slot>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import vClickOutside from './v-click-outside.vue';

interface MenuItem {
  label: string;
  to?: string;
  onClick?: () => void;
}

const props = defineProps<{
  menuItems: MenuItem[];
  buttonClass?: string;
  menuClass?: string;
  itemClass?: string;
}>();

const open = ref(false);

const toggleDropdown = () => {
  open.value = !open.value;
};

const closeDropdown = () => {
  open.value = false;
};

const handleMenuItemClick = (callback?: () => void) => {
  if (callback && typeof callback === 'function') {
    callback();
  }
  closeDropdown();
};
</script>

<script lang="ts">
import type { Directive } from 'vue';
import vClickOutside from './v-click-outside.vue';

export default {
  directives: {
    clickOutside: vClickOutside as Directive,
  },
};
</script>
