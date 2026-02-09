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
    };
  },
  created() {
    this.fetchMainShow();
  },
  methods: {
    async fetchMainShow() {
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
      this.showUrl = this.show.images[9].url || "";
      this.showName = this.show.name || "";

      if (!this.show) {
        setTimeout(() => {
          this.fetchMainShow();
        }, 2000);
        return;
      }
    },
  },
};
</script>

<template>
  <section id="main_banner">
    <div class="title_box">
      <h2>{{ showName }}</h2>
      <div class="button_container">
        <RouterLink :to="`show/${showId}`">
          <Buttons type-of-button="play" />
        </RouterLink>
        <Buttons />
      </div>
    </div>
    <img
      width="1200px"
      height="700px"
      id="main_image"
      :src="showUrl"
      alt="show image"
    />
  </section>
</template>
