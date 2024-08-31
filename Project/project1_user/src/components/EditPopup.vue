<template>
  <div class="pa-4 text-center">
    <v-dialog max-width="500" :model-value="dialog">
      <v-card prepend-icon="mdi-account" title="User Profile" class="text-h2">
        <v-card-text>
          <v-col cols="auto" class="cols">
            <v-text-field
              label="NAME"
              v-model="formData.name"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="auto" class="cols">
            <v-text-field
              label="AGE"
              v-model="formData.age"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="auto" class="cols">
            <v-text-field
              label="EMAIL"
              v-model="formData.email"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="auto" class="cols" v-model="formData.phoneNum">
            <v-text-field
              label="PHONE NUMBER"
              hint="하이픈(-)을 포함해서 작성해주세요."
              required
            ></v-text-field>
          </v-col>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="closeDialog"></v-btn>

          <v-btn
            color="primary"
            text="Save"
            variant="tonal"
            @click="submitForm"
          ></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formData: {
        name: "",
        age: "",
        email: "",
        phoneNum: "",
      },
    };
  },
  props: {
    dialog: {
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
      this.$emit("update:dialog", false);
    },
    submitForm() {
      console.log(this.formData);
      this.formData = {};
      this.closeDialog();
    },
  },
};
</script>

<style></style>
