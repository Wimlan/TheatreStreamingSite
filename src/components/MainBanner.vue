<script>
import axios from "axios";
import Buttons from "./Buttons.vue";

export default {
  components: {
    Buttons,
  },
  data() {
    return {
      showId: "Z698xZq2Z16vuzFA74",
      show: [],
      showUrl: "",
      showName: "",
      error: null,
    };
  },
  created() {
    this.fetchMainShow();
  },
  methods: {
    async fetchMainShow() {
      try {
        if (!this.showId) {
          return;
        }
        const response = await axios.get("/tm-api/discovery/v2/events.json", {
          params: {
            apikey: import.meta.env.VITE_TM_API_KEY,
            id: this.showId,
          },
        });

        this.show = response.data._embedded?.events[0] || [];
        this.showUrl = this.show.images[9]?.url || "";
        this.showName = this.show.name || "";

        this.error = null;
      } catch (err) {
        this.error = "Föreställning kunde inte hittas. Försöker igen...";
        setTimeout(() => {
          this.fetchMainShow();
        }, 2000);
      }
    },
  },
};
</script>

<template>
  <p class="loading" v-if="error">{{ error }}</p>
  <section id="main_banner">
    <div class="title_box">
      <RouterLink :to="`show/${showId}`">
        <h2>{{ showName }}</h2>
      </RouterLink>
      <div class="button_container">
        <RouterLink :to="`show/${showId}`">
          <Buttons type-of-button="play" />
        </RouterLink>
        <Buttons type-of-button="favorite" />
      </div>
    </div>
    <img id="main_image" :src="showUrl" alt="show image" />
  </section>
</template>
