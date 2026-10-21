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
  watch: {
    async globalSearch(value) {
      if (value.trim() && this.$route.path !== "/") {
        await this.$router.push("/");
      }
    },
  },
};
</script>

<template>
  <header>
    <HeaderNavigation v-model:search="globalSearch" />
  </header>

  <main>
    <RouterView v-slot="{ Component, route }">
      <component
        :is="Component"
        v-bind="route.path === '/' ? { globalSearch } : {}"
      />
    </RouterView>
  </main>

  <footer><FooterSection /></footer>
</template>
