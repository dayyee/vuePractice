<template>
  <v-app>
    <div class="title">User Management Page</div>

    <!-- 😇여기부터 다시 -->
    <v-card class="mx-auto" color="surface-light" width="70%">
      <v-card-text>
        <v-row align="center">
          <v-col>
            <v-text-field
              :loading="loading"
              append-inner-icon="mdi-magnify"
              density="compact"
              label="ID, 이름, 과목명으로 조회 가능합니다."
              variant="solo"
              hide-details
              single-line
              @click:append-inner="onClick"
            ></v-text-field>
          </v-col>
          <v-col cols="auto">
            <v-btn color="grey-darken-4">FILE UPLOAD</v-btn>
          </v-col>
          <v-col cols="auto">
            <v-btn color="black">FILE LIST</v-btn>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>

    <v-main>
      <v-container>
        <v-table height="500px" fixed-header>
          <thead>
            <tr class="column">
              <th class="text-center">ID</th>
              <th class="text-center">NAME</th>
              <th class="text-center">AGE</th>
              <th class="text-center">EMAIl</th>
              <th class="text-center">PHONE NUMBER</th>
              <th class="text-center">CONTROLLER</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in desserts" :key="item.id" class="row">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.age }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.phoneNum }}</td>
              <td>
                <v-row justify="center">
                  <v-col cols="auto" class="button-col">
                    <v-btn size="small" color="indigo-lighten-1">DETAIL</v-btn>
                  </v-col>
                  <v-col cols="auto" class="button-col">
                    <v-btn size="small" color="amber-lighten-1" @click="onOff"
                      >EDIT</v-btn
                    >
                  </v-col>
                  <v-col cols="auto" class="button-col">
                    <v-btn size="small" color="red-lighten-1">DELETE</v-btn>
                  </v-col>
                </v-row>
              </td>
            </tr>
          </tbody>
        </v-table>
      </v-container>
    </v-main>

    <v-footer app>
      <v-row justify="center">
        <v-col cols="auto">
          <v-pagination :length="4"></v-pagination>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>

  <EditPopup v-model:dialog="dialog"></EditPopup>
</template>

<script>
import EditPopup from "./components/EditPopup.vue";
export default {
  name: "App",
  components: { EditPopup },
  data() {
    return {
      desserts: [
        {
          id: 1,
          name: "한국어",
          age: 159,
          email: "Frozen@mz.co.kr",
          phoneNum: "010-0000-0000",
        },
        {
          id: 2,
          name: "한국어",
          age: 159,
          email: "Frozen@mz.co.kr",
          phoneNum: "010-0000-0000",
        },
      ],
      loaded: false,
      loading: false,
      dialog: false,
    };
  },
  methods: {
    onClick() {
      this.loading = true;

      setTimeout(() => {
        this.loading = false;
        this.loaded = true;
      }, 2000);
    },
    onOff() {
      this.dialog = true;
      console.log(this.dialog);
    },
  },
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
.title {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  text-align: left;
  font-size: 30px;
  font-weight: bold;
  margin-top: 50px;
  margin-bottom: 50px;
  margin-left: 180px;
  text-shadow: 10px 10px 9px rgba(125, 133, 131, 0.773);
}
.button-col {
  margin-left: 0px;
  margin-right: 0px;
}
.column {
  font-weight: 500;
  text-shadow: 1px 1px 5px rgba(125, 133, 131, 0.773);
}
.row {
  color: rgb(109, 107, 107);
}
</style>
