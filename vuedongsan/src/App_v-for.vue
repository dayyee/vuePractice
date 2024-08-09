<template>
  <div class="menu">
    <a v-for="a in menus" :key="a">{{ a }}</a>
    <!--<a v-for="(a, i) in menus" :key="i">{{ a }}</a>-->
    <!--key 안적으면 실행안됨. i는 변하는 데이터.. 컴퓨터가 식별할 때 쓰는..(a:array내 데이터, i:1씩 증가하는 정수)-->
    <!-- <a>Products</a> -->
    <!-- <a>About</a> -->
  </div>

  <div v-for="(a, i) in products" :key="i">
    <!--products(or 3)는 1,2,3이고 i는 0,1,2-->
    <img src="./assets/room1.jpg" class="room-img" />
    <h4 class="red" :style="스타일">{{ products[i] }}</h4>
    <p>{{ prices[i] }}</p>
    <button @click="increase(i)">허위매물신고</button>
    <span>신고수:{{ 신고수[i] }}</span>
  </div>

  <!--
  <div>
    <h4>{{ products[0] }}</h4>
    <p>50 만원</p>
    <button @click="increase">허위매물신고</button>
    <span>신고수 : {{ 신고수 }}</span>
    v-on:click => @click,
    v-on:mouseover => @mouseover
  </div>

  <div>
    <h4>{{ products[1] }}</h4>
    <p>60 만원</p>
  </div>

  <div>
    <h4>{{ products[2] }}</h4>
    <p>70 만원</p>
  </div>
--></template>

<script>
export default {
  name: "App",
  data() {
    return {
      신고수: [0, 0, 0],
      menus: ["Home", "Products", "About"],
      products: ["역삼동원룸", "천호동원룸", "마포구원룸"],
      prices: ["50만원", "80만원", "100만원"],
      스타일: "color:blue",
      image: "room1",
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
