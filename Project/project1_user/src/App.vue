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
            <v-btn color="grey-darken-4" @click="FileUploadPopupOnOff"
              >FILE UPLOAD</v-btn
            >
          </v-col>
          <v-col cols="auto">
            <v-btn color="black" @click="FileListPopupOnOff">FILE LIST</v-btn>
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
            <tr v-for="item in user" :key="item.id" class="row">
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.age }}</td>
              <td>{{ item.email }}</td>
              <td>{{ item.phoneNum }}</td>
              <td>
                <v-row justify="center">
                  <v-col cols="auto" class="button-col">
                    <v-btn
                      size="small"
                      color="indigo-lighten-1"
                      @click="DetailPopupOnOff"
                      >DETAIL</v-btn
                    >
                  </v-col>
                  <v-col cols="auto" class="button-col">
                    <v-btn
                      size="small"
                      color="amber-lighten-1"
                      @click="EditPopupOnOff"
                      >EDIT</v-btn
                    >
                  </v-col>
                  <v-col cols="auto" class="button-col">
                    <v-btn
                      size="small"
                      color="red-lighten-1"
                      @click="DeletePopupOnOff"
                      >DELETE</v-btn
                    >
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

  <EditPopup v-model:EditPopupDialog="EditPopupDialog"></EditPopup>
  <DetailPopup v-model:DetailPopupDialog="DetailPopupDialog"></DetailPopup>
  <DeletePopup v-model:DeletePopupDialog="DeletePopupDialog"></DeletePopup>
  <FileUploadPopup
    v-model:FileUploadPopupDialog="FileUploadPopupDialog"
  ></FileUploadPopup>
  <FileListPopup
    v-model:FileListPopupDialog="FileListPopupDialog"
  ></FileListPopup>
</template>

<script>
import EditPopup from "./components/EditPopup.vue";
import DetailPopup from "./components/DetailPopup.vue";
import DeletePopup from "./components/DeletePopup.vue";
import FileUploadPopup from "./components/FileUploadPopup.vue";
import FileListPopup from "./components/FileListPopup.vue";

export default {
  name: "App",
  components: {
    EditPopup,
    DetailPopup,
    DeletePopup,
    FileUploadPopup,
    FileListPopup,
  },
  data() {
    return {
      user: [
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
      EditPopupDialog: false,
      DetailPopupDialog: false,
      DeletePopupDialog: false,
      FileUploadPopupDialog: false,
      FileListPopupDialog: false,
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
    EditPopupOnOff() {
      this.EditPopupDialog = true;
    },
    DetailPopupOnOff() {
      this.DetailPopupDialog = true;
    },
    DeletePopupOnOff() {
      this.DeletePopupDialog = true;
    },
    FileUploadPopupOnOff() {
      this.FileUploadPopupDialog = true;
    },
    FileListPopupOnOff() {
      this.FileListPopupDialog = true;
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
