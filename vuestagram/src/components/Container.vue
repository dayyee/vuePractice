<template>
  <div><Post v-for="(data, i) in datas" :key="i" :data="datas[i]" /></div>
</template>

<script>
import Post from "./Post";
export default {
  components: { Post },
  props: { datas: Array },
};
</script>

<style></style>
