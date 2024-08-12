<template>
  <div>
    <h1>SignUp</h1>
    <v-text-field label="아이디" v-model="userId"></v-text-field>
    <v-text-field
      label="비밀번호"
      type="password"
      v-model="password"
    ></v-text-field>
    <v-text-field label="이름" v-model="name"></v-text-field>
    <v-text-field label="주소" v-model="address"></v-text-field>
    <v-text-field label="이미지" v-model="src"></v-text-field>
    <v-btn @click="signUp">회원가입</v-btn>
  </div>
</template>

<script>
//import { mapMutations } from "vuex";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      userId: null,
      password: null,
      name: null,
      address: null,
      src: null,
    };
  },
  methods: {
    //mapMutations는 "실행"하는거니까 methods에 넣어줘야함.
    //...mapMutations(["addUsers"]), //1️⃣

    //mapActions로 사용하기 아래 🅱️
    ...mapActions(["addUsers"]),
    signUp() {
      let userObj = {
        userId: this.userId,
        password: this.password,
        name: this.name,
        address: this.address,
        src: this.src,
      };
      //  this.addUsers(userObj); //이 userObj가 payload로 들어감.1️⃣
      // 1️⃣상위 내용은 mapMutations로 하는 방법..

      //2️⃣ mutation 직접 부르는 방법2. 이 아래꺼..
      //this.$store.commit("addUsers", userObj); //2️⃣

      // 🅰️ store에 있는 dispatch(액션 부르기)-addusers를 부르겠다. 그리고 payload가 userOjb
      // this.$store.dispatch("addUsers", userObj);

      //🅱️mapActions로 사용하기 아래
      this.addUsers(userObj);
      this.clearForm();
    },
    clearForm() {
      (this.userId = null),
        (this.password = null),
        (this.name = null),
        (this.address = null),
        (this.src = null);
    },
  },
};
</script>
