<script>
export default {
  data() {
    return {
      acts: [
        {
          title: "Akt 1 - Innan allt hände",
          length: "46 min",
          thumbnail: "/act1.jpg",
          videodata: "/MissSaigon-Goteborgsoperan",
        },
        {
          title: "Akt 2 - Efter allt hände",
          length: "48 min",
          thumbnail: "/act2.jpg",
          videodata: "/MissSaigon-Goteborgsoperan",
        },
      ],
      extras: [
        {
          title: "Intervju med regissör",
          length: "4 min",
          thumbnail: "/extrathumb.jpg",
          videodata: "/MissSaigon-Goteborgsoperan",
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
      <div @click="onVideoClick" v-for="act in acts" class="video_part">
        <img width="200px" :src="act.thumbnail" alt="" />
        <div>
          <h3>{{ act.title }}</h3>
          <p>{{ act.length }}</p>
        </div>
      </div>
    </section>
    <section class="extra">
      <h2>Extramaterial</h2>
      <div @click="onVideoClick" v-for="extra in extras" class="video_part">
        <img width="200px" :src="extra.thumbnail" alt="" />
        <div>
          <h3>{{ extra.title }}</h3>
          <p>{{ extra.length }}</p>
        </div>
      </div>
    </section>
  </article>
</template>
