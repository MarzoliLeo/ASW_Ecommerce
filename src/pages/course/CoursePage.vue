<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">{{ courseName }}</h3>
      </div>
      <p>{{ description }}</p>
      <p>People watching this page: {{ numPageViewers }}</p>
      <p>People watching the Video-Course: {{ numCourseViewers }}</p>
    </div>
    <div class="row">
      <div>
        <i v-if="!liked" @click="like()" class="bi bi-hand-thumbs-up">{{ numLikes }}</i>
        <i v-else @click="like()" class="bi bi-hand-thumbs-up-fill">{{ numLikes }}</i>
      </div>
      <div>
        <i v-if="!disliked" @click="dislike()" class="bi bi-hand-thumbs-down">{{ numDislikes }}</i>
        <i v-else @click="dislike()" class="bi bi-hand-thumbs-down-fill">{{ numDislikes }}</i>
      </div>
    </div>
    <div v-if="this.$store.state.user.email" class="row">
      <form class=" col-12 text-center pt-5">
        <div class="form-group">
          <label>Comment Description:</label>
          <textarea type="text" class="form-control" v-model="delivered_comment.comment.commentDescription"></textarea>
        </div>
        <br>
        <div class="text-center">
          <button type="button" class="btn btn-primary" @click="addComment">Submit comment</button>
        </div>
      </form>
    </div>
    <div class="row">
      <div class="row pt-5" v-if="retrievedComments && retrievedComments.length">
        <div v-for="comment in retrievedComments" :key="comment.id" class="col-xl-4 col-md-6 pt-3 d-flex">
          <CourseCommentsBox :comment="comment" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { socket } from "@/socket/socket"
import CourseCommentsBox from "@/components/courses/CourseCommentsBox.vue";
import sweetalert from "sweetalert"

export default {
  name: "CoursePage",
  components: { CourseCommentsBox },
  data() {
    return {
      numPageViewers: 0,
      numCourseViewers: 0,
      courseId: "",
      courseName: "",
      description: "",
      price: 0,
      courseCreator: "",
      delivered_comment: {
        courseName: "",
        comment: {
          userComment: this.$store.state.user.email,
          commentDescription: "",
        }
      },
      retrievedComments: [],
      liked: false,
      disliked: false,
      like_dislike: {
        courseName: "",
        userEmail: this.$store.state.user.email
      },
      numLikes: 0,
      numDislikes: 0
    }
  },
  computed: {
    lastVisitedCourse() {
      return this.$store.state.user.lastVisitedCourse;
    },
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
        });
      } catch (err) {
        console.log(err);
      }
    },
    async addComment() {
      if(this.delivered_comment.comment.commentDescription) {
        this.delivered_comment.courseName = this.courseName
        axios.post('http://127.0.0.1:3000/addCourseComment', this.delivered_comment)
        .then((res) => {
          socket.emit("requestRefreshComments", "")
        });
      } else {
        sweetalert({
          text: "Error, fill out the comment field before submitting one",
          icon: "error"
        });
      }
    },
    async getComments() {
      const res = await axios.get("http://localhost:3000/showCourseByName", {
        params: { course: this.courseName },
      });
      this.retrievedComments = res.data[0].comments
    },
    async like() {
      if(!this.liked) {
        this.liked = true;
        axios.post('http://127.0.0.1:3000/addLike', this.like_dislike)
        .then((res) => {
          socket.emit("requestRefreshLikesDislikes", "")
        });
      } else {
        this.liked = false
        axios.post('http://127.0.0.1:3000/removeLike', this.like_dislike)
        .then((res) => {
          socket.emit("requestRefreshLikesDislikes", "")
        });
      }
    },
    async dislike() {
      if(!this.disliked) {
        this.disliked = true;
        axios.post('http://127.0.0.1:3000/addDislike', this.like_dislike)
        .then((res) => {
          socket.emit("requestRefreshLikesDislikes", "")
        });
      } else {
        this.disliked = false;
        axios.post('http://127.0.0.1:3000/removeDislike', this.like_dislike)
        .then((res) => {
          socket.emit("requestRefreshLikesDislikes", "")
        });
      }
    },
    async getLikes() {
      await axios.get("http://localhost:3000/showCourseByName", {
          params: { course: this.lastVisitedCourse },
        }).then(res => {
          this.numLikes = res.data[0].likes.length
          this.liked = res.data[0].likes.includes(this.$store.state.user.email)
        });
    },
    async getDislikes() {
      await axios.get("http://localhost:3000/showCourseByName", {
          params: { course: this.lastVisitedCourse },
        }).then(res => {
          this.numDislikes = res.data[0].dislikes.length
          this.disliked = res.data[0].dislikes.includes(this.$store.state.user.email)
        });
    },
    handleVisibilityChange() {
      if (document.hidden) {
          // User switched tabs or left the page
          if(this.courseId != null && this.courseId != undefined){
            socket.emit("leaveRoom", this.courseId)
          }
      } else {
          // User came back to the page
          socket.emit("requestJoinRoom", this.courseId)
      }
    },
  },
  async mounted() {
    window.addEventListener('visibilitychange', this.handleVisibilityChange);

    socket.on("transmitRoomMembersCourse", (data) => {
      this.numPageViewers = data
    });

    socket.on("transmitRoomMembersCourseBought", (data) => {
      this.numCourseViewers = data
    });

    socket.on("refreshComments", () => {
      this.getComments();
    });

    socket.on("refreshLikesDislikes", () => {
      this.getLikes();
      this.getDislikes();
    });

    await this.getCourse();
    await this.getComments();
    await this.getLikes();
    await this.getDislikes();

    this.like_dislike.courseName = this.courseName

    socket.emit("requestJoinRoom", this.courseId)
  },
  beforeRouteLeave(to, from, next) {
    if(this.courseId != null && this.courseId != undefined){
      socket.emit("leaveRoom", this.courseId)
    }
    window.removeEventListener('visibilitychange', this.handleVisibilityChange);
    next()
  },
  beforeDestroy() {
    window.removeEventListener('visibilitychange', this.handleVisibilityChange);
  },
};
</script>