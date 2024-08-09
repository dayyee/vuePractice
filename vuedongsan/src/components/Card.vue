<template>
  <div>
    <img :src="data.image" alt="" class="room-img" />
    <h4 @click="clickSendData">{{ data.title }}</h4>
    <!--
    $emit('작명', 전달하고자하는 data(string,number형..)) : (자식쪽)부모에게 수정 요청 메시지 전송
    @openModal="ModalWindow = true" : (부모쪽)자식 메시지 수신
    -->
    <p>{{ data.price }}원</p>
    <button @click="RedBtn++">허위매물신고</button>
    <span>신고수 : {{ RedBtn }}</span>
  </div>
</template>

<script>
// 이렇게 되면, compenent 화 시킬때, number링 필요하고.[i].. 그게 .id에 있으니까 그거에 따라서 다르게?
export default {
  name: "Card",
  props: { data: Object },
  data() {
    return {
      RedBtn: this.data.redButton,
    };
  },
  methods: {
    clickSendData() {
      this.$emit("openModal", this.data.id);
    },
  },
};
</script>

<style></style>
