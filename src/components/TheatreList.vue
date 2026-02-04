<script>
import axios from "axios";

export default {
  data() {
    return {
      shows: [],
      error: null,
      addedShow: [],
      keyword: this.sortByKeyword,
    };
  },
  computed: {
    displayedShows() {
      if (this.searchQuery.trim() === "") {
        return this.shows.slice(0, this.slicedNumber);
      } else {
        return this.shows.filter((show) =>
          show.name
            .toLowerCase()
            .includes(this.searchQuery.toLowerCase().trim()),
        );
      }
    },
  },
  created() {
    this.getShows();
  },
  methods: {
    async getShows() {
      try {
        this.error = null;

        const response = await axios.get("/tm-api/discovery/v2/events.json", {
          params: {
            apikey: import.meta.env.VITE_TM_API_KEY,
            segmentName: "Arts & Theatre",
            keyword: this.keyword,
            countryCode: "SE",
            size: 200,
            includeDescription: "yes",
          },
        });

        const allShows = response.data._embedded?.events || [];

        if (!allShows) {
          setTimeout(() => {
            this.getShows();
          }, 2000);
          return;
        }

        //filtrerar shower genom att jämföra namn och sen index
        const filteredShows = allShows.filter(
          (show, index, self) =>
            index === self.findIndex((s) => s.name === show.name),
        );

        //Randomiserar showerna
        this.shows = filteredShows.sort(() => Math.random() - 0.5);
        console.log(this.shows);
      } catch (err) {
        this.error = "Kunde inte laddas. Försöker igen...";
        setTimeout(() => {
          this.getShows();
        }, 2000);
      }
    },
  },
  props: {
    sortByKeyword: String,
    searchQuery: { type: String, default: "" },
    slicedNumber: { type: Number },
  },
};
</script>

<template>
  <section>
    <p v-if="error">{{ error }}</p>
    <p v-else-if="shows.length === 0">Laddar föreställningar...</p>
    <div v-else class="show_genresection">
      <ul v-for="show in displayedShows" :key="show.id">
        <RouterLink :to="`show/${show.id}`">
          <li class="show_image">
            <img
              width="250"
              height="150"
              :src="show.images[0].url"
              alt="show image"
            />
          </li>
          <li class="play_icon">
            <img width="40px" src="/public/play.png" alt="play ikon" />
          </li>
          <li class="description">
            <h3>{{ show.name }}</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Suscipit
              labore et non, incidunt praesentium amet, aperiam reprehenderit
              accusamus omnis fugiat.
            </p>
          </li>
        </RouterLink>
      </ul>
    </div>
  </section>
</template>
