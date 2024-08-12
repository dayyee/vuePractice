<template>
  <v-container>
    <h1>Home</h1>
    <div>
      <v-btn @click="btnUpdate">1씩 증가시키기 : {{ count }}</v-btn>
      <p>state : {{ btn }}</p>
    </div>
    <div>
      <v-btn @click="getData">axios 데이터 불러오기 </v-btn>
      <p v-if="datas.length > 0">data : {{ datas }}</p>
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
import { mapActions, mapState, mapGetters } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      datas: [],
    };
  },
  computed: {
    ...mapGetters({ count: "btnGet" }),
    ...mapState(["btn"]),
  },
  methods: {
    ...mapActions(["btnUpdate"]),
    getData() {
      axios.get(`https://codingapple1.github.io/vue/more0.json`).then((res) => {
        const result = res.data;
        this.datas.push(result);
      });
    },
  },
};
</script>
