<script>
import axios from "axios";
import Buttons from "./Buttons.vue";
import LoadingIndicator from "./LoadingIndicator.vue";

export default {
  components: {
    Buttons,
    LoadingIndicator,
  },
  data() {
    return {
      showId: "6",
      show: [],
      error: null,
      isLoading: true,
    };
  },
  created() {
    this.fetchMainShow();
  },
  methods: {
    async fetchMainShow() {
      this.isLoading = true;
      this.error = null;
      try {
        if (!this.showId) {
          return;
        }
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/shows/${this.showId}`,
          {
            params: {
              apikey: import.meta.env.VITE_TM_API_KEY,
              id: this.showId,
            },
          },
        );

        this.show = response.data || [];

        console.log("Main show fetched:", this.show);

        this.error = null;
      } catch (err) {
        this.error = "Föreställning kunde inte hittas. Försöker igen...";
        setTimeout(() => {
          this.fetchMainShow();
        }, 2000);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<template>
  <p class="loading" v-if="error" role="alert">{{ error }}</p>
  <LoadingIndicator v-else-if="isLoading" />
  <section id="main_banner" v-else>
    <div class="title_box">
      <RouterLink :to="`show/${showId}`">
        <h2>{{ show.title }}</h2>
      </RouterLink>
      <div v-if="show" class="button_container">
        <RouterLink :to="`show/${showId}`">
          <Buttons type-of-button="play" />
        </RouterLink>
        <Buttons type-of-button="favorite" />
      </div>
    </div>
    <img id="main_image" :src="show.image" alt="show image" />
  </section>
</template>
