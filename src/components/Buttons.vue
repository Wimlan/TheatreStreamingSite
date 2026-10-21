<script>
export default {
  data() {
    return {
      imgWidth: "18px",
      favorited: false,
      favoriteClickCount: 0,
    };
  },
  methods: {
    addToFavorite() {
      this.favorited = !this.favorited;
      if (this.typeOfButton === "favorite") {
        this.favoriteClickCount += 1;
      }
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
    <img :width="imgWidth" src="/play(almond).png" alt="" /><span>PLAY</span>
  </button>

  <button
    class="trailer_button"
    v-else-if="typeOfButton === 'trailer'"
    type="button"
  >
    <img :width="imgWidth" src="/play(black).png" alt="" /><span>TRAILER</span>
  </button>

  <button
    v-else-if="typeOfButton === 'favorite'"
    @click="addToFavorite"
    class="favorite_button"
    type="button"
    :aria-pressed="favorited"
  >
    <img
      :key="favoriteClickCount"
      :class="{ favorite_click: favoriteClickCount > 0 }"
      :width="imgWidth"
      :src="favorited ? '/star(marked).png' : '/star.png'"
      alt=""
    /><span>FAVORITE</span>
  </button>

  <img
    v-else-if="typeOfButton === 'bookmark'"
    width="50px"
    @click="addToFavorite"
    :src="favorited ? '/bookmark(marked).png' : '/bookmark.png'"
    alt="Add to your favorites"
  />
</template>
