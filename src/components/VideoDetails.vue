<script>
export default {
  props: {
    show: { type: Object, required: true },
  },
  data() {
    return {
      acts: [
        {
          title: "Akt 1 - Innan allt hände",
          length: "46 min",
        },
        {
          title: "Akt 2 - Efter allt hände",
          length: "48 min",
        },
      ],
      extras: [
        {
          title: "Intervju med regissör",
          length: "4 min",
        },
      ],
    };
  },
  methods: {
    onVideoClick() {
      this.$emit("clicked");
    },
  },
};
</script>

<template>
  <article id="video_details">
    <section class="acts">
      <h2>Delar</h2>
      <div
        @click="onVideoClick"
        :key="act.title"
        v-for="act in acts"
        class="video_part"
      >
        <img class="video_thumbnail" width="200px" :src="show.image" alt="" />
        <div>
          <h3>{{ act.title }}</h3>
          <p>{{ act.length }}</p>
        </div>
      </div>
    </section>
    <section class="extra">
      <h2>Extramaterial</h2>
      <div
        @click="onVideoClick"
        :key="extra.title"
        v-for="extra in extras"
        class="video_part"
      >
        <img
          class="video_thumbnail"
          width="200px"
          src="/extrathumb.jpg"
          alt=""
        />
        <div>
          <h3>{{ extra.title }}</h3>
          <p>{{ extra.length }}</p>
        </div>
      </div>
    </section>
  </article>
</template>
