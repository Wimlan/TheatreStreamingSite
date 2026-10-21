<script>
import Buttons from "./Buttons.vue";

export default {
  components: { Buttons },
  props: {
    show: { type: Object, required: true },
  },
  data() {
    return {
      stars: "/fivestars.png",
      review: "A performance worth seeing!",
      reviewer: "GP",
      i: [1, 2, 3],
    };
  },
};
</script>

<template>
  <slot name="actions" />
  <section id="detailed_info">
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
          <h3 id="reviews_heading">Reviews</h3>
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
          <li v-for="member in show.productionMembers" :key="member.id">
            {{ member.title }}: {{ member.name }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>
