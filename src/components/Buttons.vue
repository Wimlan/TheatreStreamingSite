<script>
export default {
  data() {
    return {
      imgWidth: "18px",
      favorited: false,
    };
  },
  methods: {
    addToFavorite() {
      this.favorited = !this.favorited;
      console.log(this.favorited);
    },
  },
  props: {
    typeOfButton: String,
  },
};
</script>

<template>
  <button class="play_button" v-if="typeOfButton === 'play'" type="button">
    <img :width="imgWidth" src="/public/play(almond).png" alt="" />SPELA UPP
  </button>

  <button
    class="trailer_button"
    v-else-if="typeOfButton === 'trailer'"
    type="button"
  >
    <img :width="imgWidth" src="/public/play(black).png" alt="" />TRAILER
  </button>

  <button @click="addToFavorite" class="favorite_button" v-else type="button">
    <img
      :width="imgWidth"
      :src="favorited ? '/public/star(marked).png' : '/public/star.png'"
      alt=""
    />FAVORITER
  </button>
</template>
