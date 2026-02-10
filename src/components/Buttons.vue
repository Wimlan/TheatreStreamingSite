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
    <img :width="imgWidth" src="/play(almond).png" alt="" />SPELA UPP
  </button>

  <button
    class="trailer_button"
    v-else-if="typeOfButton === 'trailer'"
    type="button"
  >
    <img :width="imgWidth" src="/play(black).png" alt="" />TRAILER
  </button>

  <button
    v-else-if="typeOfButton === 'favorite'"
    @click="addToFavorite"
    class="favorite_button"
    type="button"
  >
    <img
      :width="imgWidth"
      :src="favorited ? '/star(marked).png' : '/star.png'"
      alt=""
    />FAVORITER
  </button>

  <img
    v-else-if="typeOfButton === 'bookmark'"
    width="50px"
    @click="addToFavorite"
    :src="favorited ? '/bookmark(marked).png' : '/bookmark.png'"
    alt="lägg till i din favoritlista"
  />
</template>
