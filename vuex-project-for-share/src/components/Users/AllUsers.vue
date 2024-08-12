<template>
  <div>
    <h1>All Users({{ count }})</h1>
    <h4>Seoul Users : {{ seouls }}({{ percent }}%)</h4>
    <v-list two-line>
      <v-list-tile v-for="(user, index) in allUsers" :key="index" avatar>
        <!--store불러오기. $store-->
        <v-list-tile-avatar color="grey lighten-3">
          <img :src="user.src" />
        </v-list-tile-avatar>

        <v-list-tile-content>
          <v-list-tile-title v-html="user.name"></v-list-tile-title>
          <v-list-tile-sub-title
            >id:#{{ index }} / {{ user.address }} 거주</v-list-tile-sub-title
          >
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
  </div>
</template>

<script>
import { EventBus } from "@/main.js";
//mapGetters는 getter의 지도이다. import해서 사용해줘야함.
import { mapState, mapGetters } from "vuex";

export default {
  data() {
    return {};
  },
  computed: {
    //약속. 이렇게 불러오기. array형식임. 아래꺼
    // ...mapGetters(["allUsersCount", "countOfSeoul", "percentOfSeoul"]),
    // object 형식으로 불러올 수도 있음.
    ...mapGetters({
      count: "allUsersCount",
      seouls: "countOfSeoul",
      percent: "percentOfSeoul",
    }),
    ...mapState(["allUsers"]),
  },
  mounted() {
    EventBus.$on("signUp", (users) => {
      this.$store.state.allUsers.push(users);
    });
  },
};
</script>
