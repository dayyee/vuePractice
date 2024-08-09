<template>
  <div class="discount">지금 결제하면 {{ discountPer }}% 할인</div>
  <!--<div>{{ testText }}</div>
  <div>{{ testNum }}</div>-->
</template>

<script>
export default {
  name: "Discount",
  props: {
    testText: String,
    discountPer: Number,
    오브젝트: Object,
  },
  data() {
    return {};
  },
  method: {},
};
</script>

<style></style>
