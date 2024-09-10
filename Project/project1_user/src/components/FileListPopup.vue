<template>
  <div class="pa-4 text-center">
    <v-dialog
      :model-value="FileListPopupDialog"
      max-width="600"
      max-height="600"
      persistent
    >
      <v-card
        ><div class="PopupTitle">🗄️ File List</div>
        <div v-if="filesList.length === 0" class="row text-center">
          조회 결과가 없습니다.
        </div>

        <v-table v-else fixed-header>
          <thead>
            <tr class="column">
              <th class="text-center">File Name</th>
              <th class="text-center">File Size</th>
              <th class="text-center">File Modified Date</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(file, i) in filesList"
              :key="i"
              class="row"
              align="center"
            >
              <td>{{ file.fileName }}</td>
              <td>{{ file.fileSize }} byte</td>
              <td>{{ file.lastModified }}</td>
            </tr>
          </tbody>
        </v-table>
        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="closeDialog"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  name: "FileListPopup",
  data() {
    return {};
  },
  props: {
    FileListPopupDialog: {
      type: Boolean,
      required: true,
    },
  },
  //
  watch: {
    // 팝업이 열릴 때마다 파일 리스트를 다시 불러옴
    // value는 변경될 값이니까, 변경되는 값이 true일때, 아래 코드 시행.
    FileListPopupDialog(value) {
      if (value) {
        this.AC_FILES_LIST();
      }
    },
  },
  // 데이터 불러오고..
  computed: {
    ...mapGetters({
      filesList: "GE_FILES_LIST",
    }),
  },
  methods: {
    ...mapActions(["AC_FILES_LIST"]),
    closeDialog() {
      this.$emit("update:FileListPopupDialog", false);
    },
  },
};
</script>
<style>
.PopupTitle {
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  font-size: 25px;
  padding-left: 40px;
  padding-top: 30px;
  padding-bottom: 20px;
  font-weight: bold;
}
.row {
  color: rgb(109, 107, 107);
}
</style>
