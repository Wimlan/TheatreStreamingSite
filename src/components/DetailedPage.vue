<script>
import axios from "axios";
import Buttons from "./Buttons.vue";
import LoadingIndicator from "./LoadingIndicator.vue";

export default {
  components: { Buttons, LoadingIndicator },
  data() {
    return {
      showId: "",
      show: null,
      isLoading: false,
      error: null,
      stars: "/fivestars.png",
      review: "En föreställning värd att se!",
      reviewer: "GP",
      i: [1, 2, 3],
    };
  },
  watch: {
    "$route.params.showId": { handler: "fetchShow", immediate: true },
  },
  methods: {
    async fetchShow() {
      this.show = null;
      this.error = null;
      this.showId = this.$route.params.showId;
      if (!this.showId) {
        this.error = "Föreställningen kunde inte hittas.";
        return;
      }
      this.isLoading = true;
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_API_URL}/shows/${this.showId}`,
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
  },
};
</script>

<template>
  <slot v-if="show && !isLoading && !error" name="actions" />
  <section id="detailed_info" v-if="show">
    <img
      class="banner"
      width="1000px"
      height="550px"
      :src="show.image"
      alt=""
    />
    <div class="detail_bookmark">
      <Buttons type-of-button="bookmark" class="bookmark" />
    </div>

    <div class="flex_container">
      <div class="show_description">
        <div class="detail_heading">
          <h1>{{ show.title }}</h1>
          <h2>
            {{ show.venue
            }}<span class="detail_year" v-if="show.yearPublished">
              - {{ show.yearPublished }}</span
            >
          </h2>
        </div>
        <div class="detail_copy">
          <p>
            {{ show.subHeading }}
          </p>
          <p>
            {{ show.description }}
          </p>
        </div>
        <div class="detail_reviews">
          <h3 id="reviews_heading">Recensioner</h3>
          <div
            id="recensioner"
            role="region"
            aria-labelledby="reviews_heading"
            tabindex="0"
          >
            <ul v-for="n in 3" :key="n">
              <li>
                <img width="100px" :src="stars" alt="" />
              </li>
              <li>{{ review }}</li>
              <li>- {{ reviewer }}</li>
            </ul>
          </div>
        </div>
      </div>

      <div class="production_members">
        <ul>
          <li>Regissör: Namn</li>
          <li>Skådespelare: Namn Namn Namn Namn Namn Namn</li>
          <li>Ljud & Ljus: Namn Namn</li>
          <li>Scenograf: Namn</li>
          <li>Rekvisita: Namn Namn</li>
          <li>Kostym: Namn Namn Namn</li>
          <li>Maskör: Namn Namn</li>
        </ul>
      </div>
    </div>
  </section>
  <p class="loading" v-else-if="error" role="alert">{{ error }}</p>
  <LoadingIndicator v-else-if="isLoading" text="Läser in detaljer..." />
</template>
