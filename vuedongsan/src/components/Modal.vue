<template>
  <div class="black-bg" v-if="ModalWindow == true">
    <div class="white-bg">
      <img :src="datas[ProductId].image" alt="" />
      <h4 class="title">{{ datas[ProductId].title }}</h4>
      <p>{{ datas[ProductId].content }}</p>
      수량 :
      <input v-model.number="month" />
      <!--
        <input @input="month=$event.target.value" /> : 사용자의 입력값을 여기다 저장해주세요.
        이걸 간편히 나타낸게
        <input v-model="month"/> 
        ✅ input에서 받은 데이터의 형은 string임. 그래서 number로 바꾸려면 v-model.number로 적어줘야함.
        input 뿐 아니라 input type 전부 다 쓸수 있음. textarea(넓은 입력창), select(옵션 태그임. <select><option></option></select>)
        그리고 <input type="checkbox"/> 같이 체크 박스로도 만들수 있는데 이때 v-model쓰면 type은 boolean이 됨.

        watcher
        input에 지정한 데이터 타입이 아닌 것을 입력하면 경고문을 띄우고 싶을 때 쓴다.
        script쪽에 오브젝트 생성해서 쓴다. 감시하고 싶은 데이터의 이름으로 함수 만들기.
        이렇게 되면, month의 값이 변경되면, month(a,[b])함수가 자동으로 실행됨.
        여기서 a는 사용자가 입력하여 변경될(변경 후) 값임.
        b는 변경 전 데이터임.
    -->
      <p>{{ month }}개월 선택함 : {{ datas[ProductId].price * month }}</p>
      <p><button @click="$emit('closeModal')">닫기</button></p>
    </div>
  </div>
</template>

<script>
export default {
  name: "Modal",
  props: {
    datas: Array,
    ProductId: Number,
    ModalWindow: Boolean,
  },
  data() {
    return {
      month: 3, //초기값 중요함.
    };
  },
  /*
  // data 변할 때 변동사항 보고 알림, watch로..
  watch: {
    month(a) {
      if (a >= 13) {
        alert("12개월이 최대값입니다.");
      }

      //if (typeof a !== "number") {
      if (isNaN(a) == true) {
        alert("숫자만 입력할 수 있습니다.");
        this.month = 1;
      }
      if (a == " ") {
        alert("공란 안돼.");
        this.month = 1;
      }
    },
  },
 */
  //숙제2.
  updated() {
    if (this.month <= 2) {
      alert("최소 값은 3개월입니다.");
    }
  },
  methods: {},
};
</script>

<style>
.title {
  font-size: 20px;
}
</style>
