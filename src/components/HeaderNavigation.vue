<script setup>
import { computed, ref } from "vue";
const showMenu = ref(false);
const toggleIcon = ref(true);

function toggleMenu() {
  showMenu.value = !showMenu.value;

  if (showMenu.value === true) {
    toggleIcon.value = false;
  } else {
    toggleIcon.value = true;
  }
}

const search = ref("");

const searchFilter = computed((p) => {
  return p.name.toLowerCase().indexOf(this.search.toLowerCase()) != -1;
});
</script>

<template>
  <nav>
    <img src="#" alt="logo" />

    <div id="navmenu">
      <div>
        <label v-model="search" for="searchbar">Sök</label>
        <input type="text" placeholder="Sök efter namn" />
      </div>

      <div>
        <img
          src=""
          alt="Ikon för att öppna meny"
          @click="toggleMenu"
          v-if="toggleIcon"
        />
        <img src="" alt="Stänga meny" @click="toggleMenu" v-else />

        <ul class="hamburger" v-if="showMenu">
          <li><RouterLink to="/favorites">Favoriter</RouterLink></li>
          <li><RouterLink to="/">Hem</RouterLink></li>
        </ul>
      </div>
    </div>
  </nav>
</template>
