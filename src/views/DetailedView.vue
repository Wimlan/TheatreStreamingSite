<script>
import DetailedPage from "../components/DetailedPage.vue";
import Buttons from "../components/Buttons.vue";
import VideoDetails from "../components/VideoDetails.vue";

export default {
  components: {
    DetailedPage,
    Buttons,
    VideoDetails,
  },
  data() {
    return {
      showVideo: false,
    };
  },
  methods: {
    openVideo() {
      this.showVideo = true;
      document.body.style.overflow = "hidden";
      document.body.style.height = "100vh";
    },
    closeVideo() {
      this.showVideo = false;
      document.body.style.overflow = "auto";
      document.body.style.height = "auto";
    },
  },
};
</script>

<template>
  <article id="show_page">
    <RouterLink to="/">
      <img
        class="back_icon"
        width="50px"
        src="/left-arrow.png"
        alt="Tillbaka till förstasidan"
    /></RouterLink>

    <section id="video_section" v-if="showVideo">
      <img
        width="25px"
        @click="closeVideo"
        src="/close.png"
        alt="stäng videofönster"
      />
      <video width="1000" height="550" controls>
        <source src="/MissSaigon-Goteborgsoperan.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </section>

    <DetailedPage>
      <template #actions>
        <div class="button_container">
          <Buttons id="play_show" @click="openVideo" type-of-button="play" />
          <Buttons @click="openVideo" type-of-button="trailer" />
        </div>
      </template>
    </DetailedPage>
  </article>
  <VideoDetails @clicked="openVideo" />
</template>
