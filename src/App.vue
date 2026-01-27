<script>
import HelloWorld from "./components/HelloWorld.vue";
import TheatreList from "./components/TheatreList.vue";

export default {
  components: {
    TheatreList,
    HelloWorld,
  },
};
</script>

<template>
  <HelloWorld msg="Hello World!" />
  <TheatreList />
</template>
