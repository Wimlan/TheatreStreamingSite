<script>
import "/assets/style/index.css";
import HeaderNavigation from "./components/HeaderNavigation.vue";
import FooterSection from "./components/FooterSection.vue";

export default {
  components: { HeaderNavigation, FooterSection },
  data() {
    return {
      globalSearch: "",
    };
  },
};
</script>

<template>
  <header>
    <HeaderNavigation v-model:search="globalSearch" />
  </header>

  <main><RouterView :globalSearch="globalSearch" /></main>

  <footer><FooterSection /></footer>
</template>
