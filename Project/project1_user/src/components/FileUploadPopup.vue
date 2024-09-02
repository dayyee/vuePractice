<template>
  <div class="pa-4 text-center">
    <v-dialog max-width="500" :model-value="FileUploadPopupDialog" persistent>
      <v-card
        ><div class="PopupTitle">📂 File Upload</div>
        <v-card-text>
          <v-col cols="auto" class="cols">
            <v-text-field
              label="FILE NAME"
              v-model="FileName"
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

          <v-btn text="Upload" variant="tonal" @click="submitForm"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "FileUploadPopup",
  data() {
    return {
      FileName: "",
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
  methods: {
    // start() {
    //   console.log("안녕");
    // },
    closeDialog() {
      this.$emit("update:FileUploadPopupDialog", false);
    },
    submitForm() {
      console.log(this.FileName);
      this.FileName = "";
      this.closeDialog();
    },
  },
};
</script>

<style></style>
