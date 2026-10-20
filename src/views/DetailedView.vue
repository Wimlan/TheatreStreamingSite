<script>
import axios from "axios";
import DetailedPage from "../components/DetailedPage.vue";
import Buttons from "../components/Buttons.vue";
import VideoDetails from "../components/VideoDetails.vue";
import LoadingIndicator from "../components/LoadingIndicator.vue";
import VideoPlayer from "../components/VideoPlayer.vue";

export default {
  components: {
    DetailedPage,
    Buttons,
    VideoDetails,
    LoadingIndicator,
    VideoPlayer,
  },
  data() {
    return {
      showVideo: false,
      show: null,
      isLoading: false,
      error: null,
    };
  },
  watch: {
    "$route.params.showId": { handler: "fetchShow", immediate: true },
  },
  methods: {
    async fetchShow() {
      this.show = null;
      this.error = null;
      const showId = this.$route.params.showId;
      if (!showId) {
        this.error = "Föreställningen kunde inte hittas.";
        return;
      }
      this.isLoading = true;
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/shows/${showId}`,
        );

        this.show = data;
        if (!this.show) {
          this.error = "Föreställningen kunde inte hittas.";
        }
      } catch (err) {
        this.error = "Kunde inte läsa in föreställningen. Försök igen senare.";
      } finally {
        this.isLoading = false;
      }
    },
    openVideo() {
      this.showVideo = true;
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    },
    closeVideo() {
      this.showVideo = false;
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    },
  },
};
</script>

<template>
  <article id="show_page">
    <RouterLink to="/">
      <img
        class="back_icon"
        width="50px"
        src="/left-arrow.png"
        alt="Tillbaka till förstasidan"
    /></RouterLink>

    <VideoPlayer
      v-if="showVideo && show"
      src="/MissSaigon-Goteborgsoperan.mp4"
      @close="closeVideo"
    />

    <p class="loading" v-if="error" role="alert">{{ error }}</p>
    <LoadingIndicator v-else-if="isLoading" text="Läser in detaljer..." />
    <DetailedPage v-else-if="show" :show="show">
      <template #actions>
        <div class="button_container">
          <Buttons id="play_show" @click="openVideo" type-of-button="play" />
          <Buttons @click="openVideo" type-of-button="trailer" />
        </div>
      </template>
    </DetailedPage>
  </article>
  <VideoDetails
    v-if="show && !isLoading && !error"
    :show="show"
    @clicked="openVideo"
  />
</template>
