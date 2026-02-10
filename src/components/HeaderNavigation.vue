<script setup>
import { computed, ref, watch, defineEmits } from "vue";
import axios from "axios";

const props = defineProps(["search"]);
const emits = defineEmits(["update:search"]);

const showMenu = ref(false);
const toggleIcon = ref(true);
const search = ref("");

function toggleMenu() {
  showMenu.value = !showMenu.value;

  if (showMenu.value === true) {
    toggleIcon.value = false;
  } else {
    toggleIcon.value = true;
  }
}

watch(search, (newValue) => {
  emits("update:search", newValue);
});
</script>

<template>
  <nav>
    <img width="150px" src="/teaterbiblioteket-logo.png" alt="logo" />

    <div id="navbar">
      <div>
        <input v-model="search" type="text" name="search" placeholder="SÖK" />
      </div>

      <button @click="toggleMenu">
        <img
          height="30"
          :src="toggleIcon ? '/more.png' : '/close.png'"
          alt="Öppna och stäng meny"
        />
      </button>
      <!-- <img height="30" src="" alt="Stäng meny" @click="toggleMenu" v-else /> -->

      <div class="hamburger" v-if="showMenu">
        <ul>
          <li><RouterLink to="/">HEM</RouterLink></li>
          <li><RouterLink to="/favorites">FAVORITER</RouterLink></li>
        </ul>
      </div>
    </div>
  </nav>
</template>
