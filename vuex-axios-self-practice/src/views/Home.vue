<template>
  <v-container>
    <h1>Home</h1>
    <div>
      <v-btn @click="btnUpdate">1씩 증가시키기 : {{ count }}</v-btn>
      <p>state : {{ count }}</p>
    </div>
    <div>
      <v-btn @click="getData">axios get 데이터 불러오기 </v-btn>
      <v-btn @click="postData1">axios post 데이터 불러오기 </v-btn>
      <p v-if="datas.length > 0">data : {{ datas }}</p>
      <p v-if="datas.length > 0">data : {{ research }}</p>
    </div>
    <v-list-tile router :to="{ name: 'apple' }" exact>
      <v-list-tile-action>
        <v-icon>apple</v-icon>
      </v-list-tile-action>
      <v-list-tile-content>
        <v-list-tile-title>apple</v-list-tile-title>
      </v-list-tile-content>
    </v-list-tile>
    <router-view />
  </v-container>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({ count: "btnGet", datas: "datas", research: "research" }),
  },
  methods: {
    ...mapActions(["btnUpdate", "getData", "postData"]),
    postData1() {
      this.postData({ name: "David" });
    },
  },
};
</script>
