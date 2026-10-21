<script setup>
import { computed, nextTick, ref, watch, defineEmits } from "vue";
import { useRoute } from "vue-router";

const props = defineProps({ search: { type: String, default: "" } });
const emits = defineEmits(["update:search"]);
const route = useRoute();

const showMenu = ref(false);
const toggleIcon = ref(true);
const search = computed({
  get: () => props.search,
  set: (value) => emits("update:search", value),
});
const searchOpen = ref(false);
const searchInput = ref(null);
const searchToggle = ref(null);

async function toggleSearch() {
  searchOpen.value = !searchOpen.value;
  if (searchOpen.value) {
    showMenu.value = false;
    toggleIcon.value = true;
    await nextTick();
    searchInput.value.focus();
  }
}

function closeSearch() {
  if (searchOpen.value) {
    searchOpen.value = false;
    searchToggle.value.focus();
  }
}

function toggleMenu() {
  searchOpen.value = false;
  showMenu.value = !showMenu.value;

  if (showMenu.value === true) {
    toggleIcon.value = false;
  } else {
    toggleIcon.value = true;
  }
}

watch(
  () => route.params.showId,
  (showId) => {
    if (showId) {
      search.value = "";
      searchOpen.value = false;
    }
  },
);
</script>

<template>
  <nav>
    <img width="150px" src="/TheTheatreLibrary.png" alt="logo" />

    <div id="navbar">
      <button
        ref="searchToggle"
        class="search_toggle"
        type="button"
        :aria-label="searchOpen ? 'Close search' : 'Open search'"
        :aria-expanded="searchOpen"
        aria-controls="search_panel"
        @click="toggleSearch"
      >
        <span class="search_icon" aria-hidden="true"></span>
      </button>
      <div id="search_panel" :class="{ search_open: searchOpen }">
        <input
          id="search"
          ref="searchInput"
          v-model="search"
          type="text"
          name="search"
          aria-label="Search shows"
          placeholder="search for a show"
          @keydown.esc="closeSearch"
        />
      </div>

      <button @click="toggleMenu">
        <img
          height="30"
          :src="toggleIcon ? '/more.png' : '/close.png'"
          alt="Open and close menu"
        />
      </button>
      <!-- <img height="30" src="" alt="Close menu" @click="toggleMenu" v-else /> -->

      <div class="hamburger" v-if="showMenu">
        <ul>
          <li><RouterLink to="/">HOME</RouterLink></li>
        </ul>
      </div>
    </div>
  </nav>
</template>
