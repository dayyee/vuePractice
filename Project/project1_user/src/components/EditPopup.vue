<template>
  <div class="pa-4 text-center">
    <v-dialog max-width="500" :model-value="EditPopupDialog" persistent>
      <v-card
        ><div class="PopupTitle">👤 User Profile</div>
        <v-card-text>
          <v-col cols="auto" class="cols">
            <v-text-field
              label="NAME"
              v-model="formData.name"
              required
              :placeholder="userObjById.name"
            ></v-text-field>
          </v-col>

          <v-col cols="auto" class="cols">
            <v-text-field
              label="AGE"
              v-model="formData.age"
              required
              :placeholder="userObjById.age"
            ></v-text-field>
          </v-col>

          <v-col cols="auto" class="cols">
            <v-text-field
              label="EMAIL"
              v-model="formData.email"
              required
              :placeholder="userObjById.email"
            ></v-text-field>
          </v-col>

          <v-col cols="auto" class="cols" v-model="formData.phoneNum">
            <v-text-field
              label="PHONE NUMBER"
              hint="하이픈(-)을 포함해서 작성해주세요."
              persistent-hint
              required
              :placeholder="userObjById.phoneNum"
            ></v-text-field>
          </v-col>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="closeDialog"></v-btn>

          <v-btn text="Save" variant="tonal" @click="submitForm"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "EditPopup",
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
    EditPopupDialog: {
      type: Boolean,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  created() {
    this.AC_USER_OBJ_BY_ID(this.id);
  },
  computed: {
    ...mapGetters({ userObjById: "GE_USER_OBJ_BY_ID" }),
  },
  methods: {
    // start() {
    //   console.log("안녕");
    // },
    ...mapActions(["AC_USER_OBJ_BY_ID"]),
    closeDialog() {
      this.$emit("update:EditPopupDialog", false);
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
