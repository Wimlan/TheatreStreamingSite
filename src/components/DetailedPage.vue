<script>
import axios from "axios";
import Buttons from "./Buttons.vue";

export default {
  components: { Buttons },
  data() {
    return {
      showId: "",
      show: null,
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
  <section id="detailed_info" v-if="show">
    <img
      class="banner"
      width="1000px"
      height="550px"
      :src="show.images[10]?.url"
      alt=""
    />
    <Buttons type-of-button="bookmark" class="bookmark" />

    <div class="flex_container">
      <div class="show_description">
        <h1>{{ show?.name }}</h1>
        <h2>{{ show._embedded.venues[0]?.city.name }}</h2>
        <p>
          Lorem ipsum dolor sit amet consectetur. Leo vitae vestibulum purus
          pretium tristique. Purus massa viverra vulputate nulla et amet etiam
          consectetur nulla. Vel dolor eget sit adipiscing imperdiet. Sem
          euismod purus egestas lacus sit. Lorem ipsum dolor sit amet
          consectetur. Leo vitae vestibulum purus pretium tristique. Purus massa
          viverra vulputate nulla et amet etiam consectetur nulla. Vel dolor
          eget sit adipiscing imperdiet. Sem euismod purus egestas lacus sit.
          Lorem ipsum dolor sit amet consectetur.
        </p>
        <p>
          Leo vitae vestibulum purus pretium tristique. Purus massa viverra
          vulputate nulla et amet etiam consectetur nulla. Vel dolor eget sit
          adipiscing imperdiet. Sem euismod purus egestas lacus sit. Lorem ipsum
          dolor sit amet consectetur. Leo vitae vestibulum purus pretium
          tristique. Purus massa viverra vulputate nulla et amet etiam
          consectetur nulla. Vel dolor eget sit adipiscing imperdiet. Sem
          euismod purus egestas lacus sit.
        </p>
        <h3>Recensioner</h3>
        <div id="recensioner">
          <ul v-for="n in 3">
            <li>
              <img width="100px" :src="stars" alt="" />
            </li>
            <li>{{ review }}</li>
            <li>{{ reviewer }}</li>
          </ul>
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
  <div class="loading" v-else><p>Läser in detaljer...</p></div>
</template>
