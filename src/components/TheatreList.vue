<script>
import axios from "axios";

export default {
  data() {
    return { shows: [], error: null };
  },
  created() {
    this.getShows();
  },
  methods: {
    async getShows() {
      try {
        const response = await axios.get("/tm-api/discovery/v2/events.json", {
          params: {
            apikey: import.meta.env.VITE_TM_API_KEY,
            classificationName: "theatre",
            countryCode: "SE",
          },
        });

        this.shows = response.data._embedded?.events || [];
      } catch (err) {
        this.error = "Kunde inte laddas";
        console.log(err);
      }
    },
  },
};
</script>

<template>
  <div>
    <p v-if="error">{{ error }}</p>
    <ul v-else>
      <li v-for="show in shows" :key="show.id">{{ show.name }}</li>
    </ul>
  </div>
</template>
