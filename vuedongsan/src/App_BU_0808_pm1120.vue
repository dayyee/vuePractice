<template>
  <div class="black-bg" v-if="모달창 == true">
    <div class="white-bg">
      <h4>상세페이지</h4>
      <p>상세페이지 내용</p>
      <button @click="모달창 = false">닫기</button>
    </div>
  </div>

  <div class="menu">
    <a v-for="a in menus" :key="a">{{ a }}</a>
  </div>

  <div v-for="(data, i) in datas" :key="i">
    data
    <img :src="data[i].image" alt="" class="room-img" />
    <h4 @click="모달창 = true">{{ data[i].title }}</h4>
    <p>{{ data[i].price }}원</p>
  </div>
</template>

<script>
import datas from "./assets/oneroom";

export default {
  name: "App",
  data() {
    return {
      datas: datas,
      모달창: false,
      신고수: [0, 0, 0],
      menus: ["Home", "Products", "About"],
    };
  },
  methods: {
    increase(i) {
      this.신고수[i] += 1;
    },
  },
  components: {},
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

body {
  margin: 0;
}

div {
  box-sizing: border-box;
}
.black-bg {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  padding: 20px;
}
.white-bg {
  width: 100%;
  background: white;
  border-radius: 8px;
  padding: 20px;
}

.menu {
  background-color: darkslateblue;
  padding: 15px;
  border-radius: 5px;
}

.menu a {
  color: white;
  padding: 10px;
}

.room-img {
  width: 100%;
  margin-top: 40px;
}
</style>
