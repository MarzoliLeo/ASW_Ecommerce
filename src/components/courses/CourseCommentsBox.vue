<template>
  <div class="card w-100 h-100" style="margin-top: 10px;">
    <div class="embed-responsive embed-responsive-16by9">
    </div>
    <div class="card-body text-center">
      <h5 class="card-title">Posted by: {{ comment.userComment }} </h5>
      <p class="card-text">{{ comment.commentDescription }}</p>
      <p class="card-text">Date posted in: {{ comment.posting_date }}</p>
      <button v-if="ownerLogged" @click.stop.prevent="removeCourseComment()">Remove</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { ref } from "vue";
import { socket } from "@/socket/socket"

const CourseCommentsBox = ref({});

export default {
  name: CourseCommentsBox,
  props: ["comment"],
  data() {
    return {
      ownerLogged: false,
      deleteInfo: {
          courseName: this.$store.state.user.lastVisitedCourse,
          userComment: this.comment.userComment,
          commentDescription: this.comment.commentDescription,
          posting_date: this.comment.posting_date
      }
    }
  },
  methods: {
    async isOwnerLogged(email) {
      try {
        await axios.get("http://localhost:3000/usersPermission", {
          params: {
            email: email,
          },
        })
        .then(res => {
          this.ownerLogged =
          (res.data[0].email === this.comment.userComment
          && res.data[0].permission === "Staff") 
          || res.data[0].permission === "Admin";
      });
      } catch (err) {
        console.log(err);
      }
    },
    async removeCourseComment() {
      try {
        await axios.post("http://localhost:3000/removeCourseComment", this.deleteInfo)
        .then((res) => {
          socket.emit("requestRefreshComments", "")
        });
      } catch (err) {
        console.log("Errore di tipo: " + err);
      }
    },
  },
  mounted() {
    this.isOwnerLogged(this.$store.state.user.email);
  },
};
</script>

<style scoped>
.card-img-top {
  object-fit: cover;
}
</style>