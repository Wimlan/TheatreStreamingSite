<script>
export default {
  props: {
    src: { type: String, required: true },
  },
  emits: ["close"],
};
</script>

<template>
  <section id="video_section">
    <img
      width="25px"
      @click="$emit('close')"
      src="/close.png"
      alt="stäng videofönster"
    />
    <video width="1000" height="550" controls>
      <source :src="src" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
  </section>
</template>
