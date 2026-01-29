<script>
import axios from "axios";

export default {
  data() {
    return { showId: "", show: null };
  },
  watch: {
    "$route.params.showId": { handler: "fetchShow", immediate: true },
  },
  methods: {
    async fetchShow() {
      this.show = null;
      this.showId = this.$route.params.showId;
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
    },
  },
};
</script>

<template>
  <div v-if="show">
    <h1>{{ show?.name }}</h1>
    <p>Hej</p>
  </div>
  <div v-else><p>Laddar detaljer...</p></div>
</template>
