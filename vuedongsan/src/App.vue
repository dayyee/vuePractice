<template>
  <div>
    <!--
  <div v-if="1 == 2">안녕하세요.</div>
  <div v-else-if="1 == 1">안녕하세요2</div>
  <div v-else>안녕하세요1</div>
  -->
    <transition name="fade">
      <Modal
        @closeModal="ModalWindow = false"
        :datas="datas"
        :ProductId="ProductId"
        :ModalWindow="ModalWindow"
      />
    </transition>
    <!--props 문법 사용: 근데 read-only임.-->
    <div class="menu">
      <a v-for="a in menus" :key="a">{{ a }}</a>
      <!--<a v-for="(a, i) in menus" :key="i">{{ a }}</a>-->
      <!--key 안적으면 실행안됨. i는 변하는 데이터.. 컴퓨터가 식별할 때 쓰는..(a:array내 데이터, i:1씩 증가하는 정수)-->
      <!-- <a>Products</a> -->
      <!-- <a>About</a> -->
    </div>

    <Discount :discountPer="discountPer" />

    <button @click="priceSort">가나다순 정렬</button>
    <button @click="backSort">되돌리기</button>
    <Card
      @openModal="
        ModalWindow = true;
        ProductId = $event;
      "
      v-for="(data, i) in datas"
      :key="i"
      :data="datas[i]"
      :RedBtn="datas[i].redButton"
    />

    <!--
    저 위에 openModal안에 ProductId i로 해도됨.
  <div v-for="(a, i) in products" :key="i">
    ProductId: String,ducts(or 3)는 1,2,3이고 i는 0,1,2-->
    <!-- <img src="./assets/room1.jpg" class="room-img" />
    <h4 class="red" :style="스타일">{{ products[i] }}</h4>
    <p>{{ prices[i] }}</p>
    <button @click="increase(i)">허위매물신고</button>
    <span>신고수:{{ 신고수[i] }}</span>
  </div>
  --></div>
</template>

<script>
import datas from "./assets/oneroom";
import Discount from "./components/Discount";
import Modal from "./components/Modal";
import Card from "./components/Card";

export default {
  name: "App",
  data() {
    return {
      RedBtn: 0,
      discountPer: 30,
      minDiscountPer: 0,
      오브젝트: { name: "kim", age: 20 },
      datas: datas,
      // 사본 생성이 아님.. originDatas: datas,
      // array/object 데이터의 각각 별개의 사본을 만들려면 [...array자료]🔽
      originDatas: [...datas],
      ProductId: 0,
      ModalWindow: false,
      menus: ["Home", "Products", "About"],
    };
  },
  methods: {
    increase() {
      this.RedBtn++;
    },
    check(i) {
      console.log(i);
    },
    priceSort() {
      // .sort는 원본을 변형을 시킴
      /*  this.datas.sort(function(a, b) {
        //원룸들 가격순 정렬: return a.price - b.price;
        //원룸들 가격순(역순) 정렬: return b.price - a.price;
      }); */
      this.datas.sort(function compare(a, b) {
        //원룸들 이름순 정렬(오름차순). 내림차순으로 바꾸고싶으면 return값 교환.
        if (a.title > b.title) return 1;
        if (a.title < b.title) return -1;
      });
    },
    backSort() {
      // this.datas = this.originDatas;
      // 이렇게 등호로 array를 집어넣으면, 왼쪽 오른쪽값 공유해주세요~뜻이 된다.
      // 그래서 어느순간 정렬이 안되어버림.
      // 개별 복사본으로 만들어서
      this.datas = [...this.originDatas];
    },
  },
  /*
  // 🔽lifecycle hook!
  mounted() {
    // App.vue(메인페이지)에 mounted() 사용하면,  메인페이지가 mount 되고 나서 실행..

    // ✨서버에서 데이터 가져올 때도 lifecycle hook 안에 코드 짠다.(ajax 요청같은..)
    // created() or mounted() hook 하나가지고 ajax 요청함.
    // created() : html 생성전, data만 존재할때
    // mounted() : 완전 마운트가 됐을 때

    // 마운트 된 후에 배너 닫아주소..
    //애로우 펑션이어야 바깥 this 확실히 가져온다.
    // 일반 setTimeout(function() {},초);으로 쓰면 실행안됨..
    setTimeout(() => {
      this.isShow = false;
    }, 2000); //2초 후에 안의 함수를 쓰고싶어요.
  },

 */

  /*
 ❤️❤️❤️❤️❤️❤️❤️❤️
 숙제1. 메인페이지 로드 후 부터 30%할인 문구가 1초마다 1%씩 감소
      setInterval(()=>{},1000); 1초마다 안에 함수 실행..
  숙제2. 모달창의 input 안에 2를 기입했을 때 "우린 2개월치는 안해요. 3개월부터 계약 가능해요." 알림창 띄우려면?
      -> watch도 있지만.. lifecycle hook 잘쓰면 할 수 있어.
        input에 뭐 입력하면 재렌더링이 일어나기때문에 (lifecycle-updated(), 재렌더링)

 */
  //숙제1.
  mounted() {
    const timer = setInterval(() => {
      if (this.discountPer > this.minDiscountPer) this.discountPer--;
      else clearInterval(timer);
    }, 500);
  },
  components: { Discount, Modal, Card },
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

.fade-enter-from {
  opacity: 0;
}
.fade-enter-active {
  transition: all 1s;
}
.fade-enter-to {
  opacity: 1;
}

.fade-leave-from {
  opacity: 1;
}
.fade-leave-active {
  transition: all 1s;
}
.fade-leave-to {
  opacity: 0;
}
.start {
  opacity: 0;
  transition: all 1s;
}

.end {
  opacity: 1;
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

.discount {
  font-size: 20px;
  font-weight: bold;
  color: blue;
  background: #eee;
  padding: 50px;
  margin: 10px;
  border-radius: 5px;
}
</style>
