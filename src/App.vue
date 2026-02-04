<!-- Att göra:
*I theathrelist.vue:
-Gör props för hur många kort jag vill visa
-styla korten
-->

<script>
import "/assets/style/index.css";
import HeaderNavigation from "./components/HeaderNavigation.vue";

export default {
  components: { HeaderNavigation },
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

  <footer>
    Licenses:
    <a
      href="https://www.flaticon.com/free-icons/hamburger"
      title="hamburger icons"
      >Hamburger icons created by feen - Flaticon</a
    >
    <a href="https://www.flaticon.com/free-icons/search" title="search icons"
      >Search icons created by Catalin Fertu - Flaticon</a
    >
    <a href="https://www.flaticon.com/free-icons/close" title="close icons"
      >Close icons created by ariefstudio - Flaticon</a
    >
    <a href="https://www.flaticon.com/free-icons/video" title="video icons"
      >Video icons created by Bingge Liu - Flaticon</a
    >
  </footer>
</template>
