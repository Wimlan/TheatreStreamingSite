<!-- Att göra:
*I theathrelist.vue: Gör props för hur många kort jag vill visa
*I router.js: Lägg till specifik produkt när den klickas på -->

<script>
import "/assets/style/index.css";

export default {
  components: {},
};
</script>

<template>
  <header>
    <nav>
      <ul>
        <li><RouterLink to="/favorites">Favoriter</RouterLink></li>
        <li><RouterLink to="/">Hem</RouterLink></li>
      </ul>
    </nav>
  </header>

  <main><RouterView /></main>
</template>
