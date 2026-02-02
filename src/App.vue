<!-- Att göra:
*I theathrelist.vue:
-Gör props för hur många kort jag vill visa
-styla korten
*I app:
-Gör mobilmeny och lägga till logo och sökfunktion med v-model -->

<script>
import "/assets/style/index.css";
import HeaderNavigation from "./components/HeaderNavigation.vue";

export default {
  components: { HeaderNavigation },
};
</script>

<template>
  <header>
    <HeaderNavigation />
  </header>

  <main><RouterView /></main>
</template>
