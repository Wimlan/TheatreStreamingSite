<script>
import TheatreList from "./components/TheatreList.vue";

export default {
  components: {
    TheatreList,
  },
};
</script>

<template>
  <TheatreList sortByKeyword="dance" />
  <TheatreList sortByKeyword="musical" />
  <TheatreList sortByKeyword="comedy" />
  <TheatreList />
</template>
