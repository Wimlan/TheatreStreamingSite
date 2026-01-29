<script>
import TheatreList from "../components/TheatreList.vue";

export default {
  components: {
    TheatreList,
  },
};
</script>

<template>
  <!-- Gör en props för hur många theathrelist kort jag vill visa -->
  <TheatreList sortByKeyword="dance" />
  <TheatreList sortByKeyword="musical" />
  <TheatreList sortByKeyword="comedy" />
  <TheatreList />
</template>
