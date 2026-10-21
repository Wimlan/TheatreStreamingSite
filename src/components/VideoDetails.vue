<script>
export default {
  props: {
    show: { type: Object, required: true },
  },
  data() {
    return {
      acts: [
        {
          title: "Act 1 - Before it all happened",
          length: "46 min",
        },
        {
          title: "Act 2 - After it all happened",
          length: "48 min",
        },
      ],
      extras: [
        {
          title: "Interview with the director",
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
      <h2>Parts</h2>
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
      <h2>Extras</h2>
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
