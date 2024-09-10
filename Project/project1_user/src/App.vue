<template>
  <v-app>
    <div class="title">
      <a href="/">User Management Page</a>
    </div>

    <v-card class="mx-auto" color="surface-light" width="75%">
      <v-card-text>
        <v-row align="center">
          <v-col>
            <v-text-field
              :loading="loading"
              append-inner-icon="mdi-magnify"
              density="compact"
              label="ID, 이름으로 조회 가능합니다."
              variant="solo"
              hide-details
              single-line
              v-model="keyValue"
              @click:append-inner="SearchBarOnClick"
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
        <div
          v-if="Object.keys(this.usersObj).length === 0 || resultYn"
          class="row"
        >
          조회 결과가 없습니다.
        </div>

        <v-table v-else height="500px" fixed-header>
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
            <tr v-for="user in filteredUsers" :key="user.id" class="row">
              <td>{{ user.id }}</td>
              <td>{{ user.name }}</td>
              <td>{{ user.age }}</td>
              <td>{{ user.email }}</td>
              <td>{{ user.phoneNum }}</td>
              <td>
                <v-row justify="center">
                  <v-col cols="auto" class="button-col">
                    <v-btn
                      size="small"
                      color="indigo-lighten-1"
                      @click="DetailPopupOnOff(user.id)"
                      >DETAIL</v-btn
                    >
                  </v-col>
                  <v-col cols="auto" class="button-col">
                    <!--tbody로 묶여 있으니 user.id가 뭔지 아는 것.. -->
                    <v-btn
                      size="small"
                      color="amber-lighten-1"
                      @click="EditPopupOnOff(user.id)"
                      >EDIT</v-btn
                    >
                  </v-col>
                  <v-col cols="auto" class="button-col">
                    <v-btn
                      size="small"
                      color="red-lighten-1"
                      @click="DeletePopupOnOff(user.id)"
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
          <!-- currentPage는 v-model로 되어있고, 값이 계속 바뀜-->
          <v-pagination
            v-model="currentPage"
            :length="totalPages"
            :total-visible="5"
          ></v-pagination>
        </v-col>
      </v-row>
    </v-footer>
  </v-app>

  <EditPopup
    v-model:EditPopupDialog="EditPopupDialog"
    :id="Number(selectedId)"
  ></EditPopup>
  <DetailPopup
    v-model:DetailPopupDialog="DetailPopupDialog"
    :id="Number(selectedId)"
  ></DetailPopup>
  <DeletePopup
    v-model:DeletePopupDialog="DeletePopupDialog"
    :id="Number(selectedId)"
  ></DeletePopup>
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
import { mapGetters, mapActions } from "vuex";

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
      loaded: false,
      loading: false,
      EditPopupDialog: false,
      DetailPopupDialog: false,
      DeletePopupDialog: false,
      FileUploadPopupDialog: false,
      FileListPopupDialog: false,

      // pagination
      usersListForPage: [],
      currentPage: 1, // 현재 페이지 번호
      itemsPerPage: 5, // 페이지당 항목 수(내가 설정)

      selectedId: null,
      keyValue: null,
      resultYn: false,
    };
  },
  methods: {
    ...mapActions(["AC_USERS_OBJ", "AC_USERS_OBJ_BY_KEYWORD"]),

    async SearchBarOnClick() {
      // 조회 값 없을 때 검색 불가.
      if (this.keyValue == null || this.keyValue.length <= 0) {
        return alert("조회 값을 입력하세요.");
      }
      this.loading = true;

      // keyvalue가 숫자인지 확인하기(정규식써서)
      const numberPattern = /^[-+]?[0-9]*\.?[0-9]+([eE][-+]?[0-9]+)?$/;
      const isNumber = numberPattern.test(this.keyValue);

      if (isNumber) {
        const numValue = Number(this.keyValue);
        await this.AC_USERS_OBJ_BY_KEYWORD(numValue);
      } else {
        await this.AC_USERS_OBJ_BY_KEYWORD(this.keyValue);
      }

      // userOjbBykw 값 있는지 없는지 확인하여 없으면 div 출력, 있으면 테이블 출력
      if (this.userObjBykw === 0) {
        this.resultYn = true;
      } else {
        this.resultYn = false;
      }

      setTimeout(() => {
        this.loading = false;
      }, 1000);
    },

    EditPopupOnOff(id) {
      this.selectedId = id;
      this.EditPopupDialog = true;
    },
    DetailPopupOnOff(id) {
      this.selectedId = id;
      this.DetailPopupDialog = true;
    },
    DeletePopupOnOff(id) {
      this.selectedId = id;
      this.DeletePopupDialog = true;
    },
    FileUploadPopupOnOff() {
      this.FileUploadPopupDialog = true;
    },
    FileListPopupOnOff() {
      this.FileListPopupDialog = true;
    },
    pageLen() {
      return;
    },
    // check() {
    //   console.log();
    // },
  },
  watch: {
    // edit완료되고나서 목록 다시 부르기
    EditPopupDialog(value) {
      if (!value) {
        this.AC_USERS_OBJ();
      }
    },
    DeletePopupDialog(value) {
      if (!value) {
        this.AC_USERS_OBJ();
      }
    },
  },
  // 이렇게 액션이니까 함수로 들어가있는.. 이 created에?
  created() {
    this.AC_USERS_OBJ();
  },
  // 데이터 불러오고..
  computed: {
    ...mapGetters({
      usersObj: "GE_USERS_OBJ",
      userObjBykw: "GE_USER_OBJ_BY_KEYWORD",
    }),
    usersArray() {
      return Object.values(this.usersObj); // 객체를 배열로 변환
    },
    totalPages() {
      return Math.ceil(this.usersArray.length / this.itemsPerPage);
    },
    filteredUsers() {
      // 검색 결과가 있으면 그 값을 반환하고, 없으면 기본 사용자 리스트 반환
      return Object.keys(this.userObjBykw).length > 0
        ? [this.userObjBykw] // obj타입이라 []로 바꿔줌
        : this.paginatedUsers;
    },
    /*
    v-model을 사용하여 currentPage를 v-pagination에 바인딩하면, 사용자가 페이지 번호를 클릭할 때마다 currentPage 값이 자동으로 업데이트됩니다.
    이 값이 변경되면, paginatedUsers와 같은 관련 데이터도 자동으로 업데이트되어, 올바른 페이지의 데이터가 화면에 표시됩니다.
    현재 페이지를 유지하려면 v-model 속성을 제공하기만 하면 됩니다. (이거 vuetify 사용법인듯?)
    */
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.usersArray.slice(start, end);
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
a {
  text-decoration: none;
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
