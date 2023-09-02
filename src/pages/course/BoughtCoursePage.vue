<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">{{ courseName }}</h3>
      </div>
      <p>{{ description }}</p>
      <div class="youtubeVideo"><iframe v-if="this.ytLink" width="1920" height="1080" :src="'https://www.youtube.com/embed/' + ytLink"></iframe></div>
      <p>People watching this page: {{ numPageViewers }}</p>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { mapGetters } from "vuex";
import { socket } from "@/socket/socket"

export default {
  name: "BoughtCoursePage",
  data() {
    return {
      numPageViewers: 0,
      courseId: "",
      courseName: "",
      description: "",
      price: 0,
      courseCreator: "",
      ytLink: "",
    }
  },
  computed: {
    ...mapGetters("user", ["lastVisitedCourse", "email"]),
  },
  methods: {
    async getCourse() {
      try {
        await axios.get("http://localhost:3000/showCourseByName", {
          params: { course: this.lastVisitedCourse },
        }).then(res => {
          this.courseId = res.data[0]._id
          this.courseName = res.data[0].coursesName;
          this.description = res.data[0].description;
          this.price = res.data[0].price;
          this.courseCreator = res.data[0].courseCreator;
          this.ytLink = res.data[0].courseYTLink;
        });
      } catch (err) {
        console.log(err);
      }
    },
    handleVisibilityChange() {
      if (document.hidden) {
          // User switched tabs or left the page
          socket.emit("leaveRoom", this.courseId + "-Bought")
      } else {
          // User came back to the page
          socket.emit("requestJoinRoom", this.courseId + "-Bought")
      }
    },
  },
  async mounted() {
    console.log(this.$route.params.course)
    window.addEventListener('visibilitychange', this.handleVisibilityChange);

    socket.on("transmitRoomMembersCourseBought", (data) => {
      this.numPageViewers = data
    });
    await this.getCourse();
    socket.emit("requestJoinRoom", this.courseId + "-Bought")
  },
  beforeRouteLeave(to, from, next) {
    socket.emit("leaveRoom", this.courseId + "-Bought")
    window.removeEventListener('visibilitychange', this.handleVisibilityChange);
    next()
  },
  beforeDestroy() {
    window.removeEventListener('visibilitychange', this.handleVisibilityChange);
  },
};
</script>

<style>
.youtubeVideo {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 */
    height: 0;
    overflow: hidden;
}

.youtubeVideo iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
</style>