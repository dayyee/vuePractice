<template>
  <div class="pa-4 text-center">
    <v-dialog max-width="500" :model-value="FileUploadPopupDialog" persistent>
      <v-card
        ><div class="PopupTitle">📂 File Upload</div>
        <v-card-text>
          <div>현재 조회된 회원 목록을 업로드합니다.</div>

          <v-col cols="auto" class="cols">
            <v-text-field
              label="FILE TITLE"
              v-model="fileTitle"
              persistent-hint
              hint="파일명을 입력하세요."
              required
            ></v-text-field>
          </v-col>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Cancle" variant="plain" @click="closeDialog"></v-btn>

          <v-btn
            text="Upload"
            variant="tonal"
            @click="confirmPopupOpen"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

  <div class="text-center pa-4">
    <v-dialog :model-value="confirmPopup" max-width="400" persistent>
      <v-card text="저장하시겠습니까?" title="✓ check" color="blue">
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeDialog" variant="plain"> Cancle </v-btn>
          <v-btn @click="submitForm" variant="tonal"> Ok </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

// 현재 불러들인 데이터 body로 userList에 저장 : {fileTitle, userList[]}
// fileTitle은 input으로 받은거 fileTitle에 저장
// 전체 데이터를 api로 보내기 (post)
// 1을 받으면 업로드 완료 alert와 자동 창 닫기, 외 대답이면 업로드 실패 알리기?

export default {
  name: "FileUploadPopup",
  data() {
    return {
      fileTitle: "",
      confirmPopup: false,
      formData: {
        fileTitle: "",
        userList: "",
      },
    };
  },
  props: {
    FileUploadPopupDialog: {
      type: Boolean,
      required: true,
    },
  },
  created() {
    //this.start();
  },
  computed: {
    ...mapGetters({ usersObj: "GE_USERS_OBJ" }),
  },
  methods: {
    // start() {
    //   console.log("안녕");
    // },
    ...mapActions({ uploadFunc: "AC_FILE_UPLOAD" }),
    closeDialog() {
      this.$emit("update:FileUploadPopupDialog", false);
      this.confirmPopup = false;
      this.fileTitle = "";
    },
    async submitForm() {
      try {
        this.formData.fileTitle = this.fileTitle;
        this.formData.userList = this.usersObj;
        console.log(this.formData);
        const result = await this.uploadFunc(this.formData);
        alert(result);
        this.closeDialog();
      } catch (err) {
        console.log(err);
      }
    },
    confirmPopupOpen() {
      this.confirmPopup = true;
    },
  },
};
</script>

<style></style>
