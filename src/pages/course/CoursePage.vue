<template>
  <div class="container">
    <div class="row">
      <div class="col-12 text-center">
        <h3 class="pt-3">{{ CourseInfo.courseName }}</h3>
      </div>
      <div v-if="CourseInfo.courseYTLink" class="embed-responsive embed-responsive-16by9">
        <img class="card-img-top" :src="'https://img.youtube.com/vi/' + CourseInfo.courseYTLink + '/maxresdefault.jpg'" alt="Card image here">
      </div>
      <p class="mt-3 mb-2">{{ CourseInfo.description }}</p>
    </div>
    <div class="row">
      <div class="col-2 mb-4 mt-4 d-flex align-items-left">
        <RouterLink v-if:="CourseInfo.ownerLogged" class="nav-link" :to="{ name: 'CourseModify' }">    
          <button class="btn btn-secondary me-4">Modify Course</button>
        </RouterLink>
        <button v-if="CourseInfo.ownerLogged" class="col-6 ms-3 btn btn-secondary" @click.stop.prevent="removeCourse()">Remove Course</button>
      </div>
    </div>
    <div class="row mt-4">
      <p class="h-25">People watching this page: {{ CourseInfo.numPageViewers }}</p>
      <p class="h-25">People watching the Video-Course: {{ CourseInfo.numCourseViewers }}</p>
    </div>
    <div class="row d-flex align-items-left w-25 user-select-none">
      <div class="col-2 h-25">
        <i v-if="!CourseInfo.liked" @click="like()" role="button" class="bi bi-hand-thumbs-up">{{ CourseInfo.numLikes }}</i>
        <i v-else @click="like()" role="button" class="bi bi-hand-thumbs-up-fill">{{ CourseInfo.numLikes }}</i>
      </div>
      <div class="col-2 h-25 pe-auto">
        <i v-if="!CourseInfo.disliked" @click="dislike()" role="button" class="bi bi-hand-thumbs-down">{{ CourseInfo.numDislikes }}</i>
        <i v-else @click="dislike()" role="button" class="bi bi-hand-thumbs-down-fill">{{ CourseInfo.numDislikes }}</i>
      </div>
    </div>
    <div v-if="this.email" class="row">
      <form class="col-12 text-center pt-5">
        <div class="form-group">
          <label>Comment Description:</label>
          <textarea type="text" class="form-control" v-model="delivered_comment.comment.commentDescription"></textarea>
        </div>
        <br>
        <div class="text-center mb-4">
          <button type="button" class="btn btn-primary" @click="addComment">Submit comment</button>
        </div>
      </form>
    </div>
    <div class="row mb-3">
      <div class="row pt-5" v-if="CourseInfo.retrievedComments && CourseInfo.retrievedComments.length">
        <div v-for="comment in CourseInfo.retrievedComments" :key="comment.id" class="col-xl-4 col-md-6 pt-3 d-flex">
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
import { mapGetters, } from "vuex";

export default {
  name: "CoursePage",
  components: { CourseCommentsBox },
  data() {
    return {
      CourseInfo: {
        numPageViewers: 0,
        numCourseViewers: 0,
        courseId: "",
        courseName: "",
        description: "",
        price: 0,
        courseCreator: "",
        courseYTLink: "",
        liked: false,
        disliked: false,
        numLikes: 0,
        numDislikes: 0,
        retrievedComments: [],
      },
      ownerLogged: false,
      delivered_comment: {
        courseName: "",
        comment: {
          userComment: this.email,
          commentDescription: "",
        }
      },
      like_dislike: {
        courseName: "",
        userEmail: this.email
      },
    }
  },
  computed: {
    ...mapGetters("user", ["email", "lastVisitedCourse"]),
  },
  methods: {
    async getCourse() {
      try {
        await axios.get("http://localhost:3000/showCourseByName", {
          params: { course: this.lastVisitedCourse },
        }).then(res => {
          this.CourseInfo.courseId = res.data[0]._id
          this.CourseInfo.courseName = res.data[0].coursesName;
          this.CourseInfo.description = res.data[0].description;
          this.CourseInfo.price = res.data[0].price;
          this.CourseInfo.courseCreator = res.data[0].courseCreator;
          this.CourseInfo.courseYTLink = res.data[0].courseYTLink
        });
      } catch (err) {
        console.log(err);
      }
    },
    async addComment() {
      if(this.delivered_comment.comment.commentDescription) {
        this.delivered_comment.courseName = this.CourseInfo.courseName
        this.delivered_comment.comment.userComment = this.email
        console.log(this.delivered_comment)
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
        params: { course: this.CourseInfo.courseName },
      });
      this.CourseInfo.retrievedComments = res.data[0].comments
    },
    async like() {
      if(this.email && !this.CourseInfo.disliked) {
        if(!this.CourseInfo.liked) {
          this.CourseInfo.liked = true;
          axios.post('http://127.0.0.1:3000/addLike', this.like_dislike)
          .then((res) => {
            socket.emit("requestRefreshLikesDislikes", "")
          });
        } else {
          this.CourseInfo.liked = false
          axios.post('http://127.0.0.1:3000/removeLike', this.like_dislike)
          .then((res) => {
            socket.emit("requestRefreshLikesDislikes", "")
          });
        }
      }
    },
    async dislike() {
      if(this.email && !this.CourseInfo.liked) {
        if(!this.CourseInfo.disliked) {
          this.CourseInfo.disliked = true;
          axios.post('http://127.0.0.1:3000/addDislike', this.like_dislike)
          .then((res) => {
            socket.emit("requestRefreshLikesDislikes", "")
          });
        } else {
          this.CourseInfo.disliked = false;
          axios.post('http://127.0.0.1:3000/removeDislike', this.like_dislike)
          .then((res) => {
            socket.emit("requestRefreshLikesDislikes", "")
          });
        }
      }
    },
    async getLikes() {
      await axios.get("http://localhost:3000/showCourseByName", {
          params: { course: this.lastVisitedCourse },
        }).then(res => {
          this.CourseInfo.numLikes = res.data[0].likes.length
          this.CourseInfo.liked = res.data[0].likes.includes(this.email)
        });
    },
    async getDislikes() {
      await axios.get("http://localhost:3000/showCourseByName", {
          params: { course: this.lastVisitedCourse },
        }).then(res => {
          this.CourseInfo.numDislikes = res.data[0].dislikes.length
          this.CourseInfo.disliked = res.data[0].dislikes.includes(this.email)
        });
    },
    async removeCourse(courseName) {
      const courseToDelete = {
        courseName: this.courseName,
      };
      try {
        await axios.post("http://localhost:3000/deleteCourse", courseToDelete);
        socket.emit("requestRefreshCourses", "");
        sweetalert({
          text: "Course deleted succesfully",
          icon: "success",
        });
        this.$router.push("/")
      } catch (err) {
        sweetalert({
          text: "Deletion failed. Course not deleted.",
          icon: "error",
        });
        console.log("Errore di tipo: " + err);
      }
    },
    async isOwnerLogged(email) {
      if(email != '' && email != undefined) {
        try {
          await axios.get("http://localhost:3000/usersPermission", {
            params: {
              email: email,
            },
          })
          .then(res => {
            this.CourseInfo.ownerLogged =
            (res.data[0].email === this.CourseInfo.courseCreator 
            && res.data[0].permission === "Staff") 
            || res.data[0].permission === "Admin";
        });
        } catch (err) {
          console.log(err);
        }
      }
    },
    handleVisibilityChange() {
      if (document.hidden) {
          // User switched tabs or left the page
          if(this.CourseInfo.courseId != null && this.CourseInfo.courseId != undefined){
            socket.emit("leaveRoom", this.CourseInfo.courseId)
          }
      } else {
          // User came back to the page
          socket.emit("requestJoinRoom", this.CourseInfo.courseId)
      }
    },
  },
  async mounted() {
    window.addEventListener('visibilitychange', this.handleVisibilityChange);
    await this.getCourse();

    this.isOwnerLogged(this.email);

    socket.on("transmitRoomMembersCourse", (data) => {
      this.CourseInfo.numPageViewers = data
    });

    socket.on("transmitRoomMembersCourseBought", (data) => {
      this.CourseInfo.numCourseViewers = data
    });

    socket.on("refreshComments", () => {
      this.getComments();
    });

    socket.on("refreshLikesDislikes", () => {
      this.getLikes();
      this.getDislikes();
    });

    await this.getComments();
    await this.getLikes();
    await this.getDislikes();

    this.like_dislike.courseName = this.CourseInfo.courseName
    this.like_dislike.userEmail = this.email

    socket.emit("requestJoinRoom", this.CourseInfo.courseId)
  },
  beforeRouteLeave(to, from, next) {
    if(this.CourseInfo.courseId != null && this.CourseInfo.courseId != undefined){
      socket.emit("leaveRoom", this.CourseInfo.courseId)
    }
    window.removeEventListener('visibilitychange', this.handleVisibilityChange);
    next()
  },
  beforeDestroy() {
    window.removeEventListener('visibilitychange', this.handleVisibilityChange);
  },
};
</script>