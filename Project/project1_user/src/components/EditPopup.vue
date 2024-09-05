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
              :placeholder="String(userObjById.age)"
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

          <v-col cols="auto" class="cols">
            <v-text-field
              label="PHONE NUMBER"
              hint="하이픈(-)을 포함해서 작성해주세요."
              persistent-hint
              v-model="formData.phoneNum"
              required
              :placeholder="userObjById.phoneNum"
            ></v-text-field>
          </v-col>
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="closeDialog"></v-btn>

          <v-btn text="Save" variant="tonal" @click="confirmPopupOpen"></v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>

  <div class="text-center pa-4">
    <v-dialog :model-value="confirmPopup" max-width="400" persistent>
      <v-card text="수정하시겠습니까?" title="✓ check">
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeDialog" variant="plain"> Cancle </v-btn>
          <v-btn @click="submitForm" variant="tonal"> Ok </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <!-- 
    😇 ㅎㅎ 보류...
    <v-sheet class="position-relative" min-height="450">
      <v-fade-transition hide-on-leave>
        <v-card
          v-if="updateOk"
          append-icon="$close"
          class="mx-auto"
          elevation="16"
          max-width="500"
          title="update complete"
        >
          <template v-slot:append>
            <v-btn
              icon="$close"
              variant="text"
              @click="updateOk = false"
            ></v-btn>
          </template>
          <v-divider></v-divider>

          <div class="py-12 text-center">
            <v-icon
              class="mb-6"
              color="success"
              icon="mdi-check-circle-outline"
              size="128"
            ></v-icon>

            <div class="text-h4 font-weight-bold">This receipt was sent</div>
          </div>

          <v-divider></v-divider>

          <div class="pa-4 text-end">
            <v-btn
              class="text-none"
              color="medium-emphasis"
              min-width="92"
              variant="outlined"
              rounded
              @click="updateOk = false"
            >
              Close
            </v-btn>
          </div>
        </v-card>
      </v-fade-transition>
    </v-sheet>

 -->
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "EditPopup",
  data() {
    return {
      formData: {
        id: "",
        name: "",
        age: "",
        email: "",
        phoneNum: "",
      },
      confirmPopup: false,
      updateOk: false,
      updateTitle: "",
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
  watch: {
    //EditPopupDialog가 true일 때만 액션 실행
    EditPopupDialog(value) {
      if (value) {
        this.loadUserData();
      }
    },
  },
  computed: {
    ...mapGetters({ userObjById: "GE_USER_OBJ_BY_ID" }),
  },
  methods: {
    ...mapActions(["AC_USER_OBJ_BY_ID", "AC_UPDATE_USER_BY_ID"]),
    closeDialog() {
      this.confirmPopup = false;
      this.updateOk = false;
      this.$emit("update:EditPopupDialog", false);
    },
    async submitForm() {
      //console.log(this.formData);
      try {
        const result = await this.AC_UPDATE_USER_BY_ID(this.formData);

        if (result) {
          this.updateOk = true;
          this.updateTitle = result;
          console.log(this.updateOk, this.updateTitle);
          console.log("submit update user info: ", result);
          alert(result);
        }
      } catch (err) {
        console.error("Error updating user: ", err);
      }
      this.closeDialog();
      this.formData = {};
    },
    async loadUserData() {
      console.log("id", this.id);
      await this.AC_USER_OBJ_BY_ID(this.id);
      this.formData = {
        id: this.userObjById.id,
        name: this.userObjById.name,
        age: this.userObjById.age,
        email: this.userObjById.email,
        phoneNum: this.userObjById.phoneNum,
      };
    },
    confirmPopupOpen() {
      this.confirmPopup = true;
    },
  },
};
</script>

<style></style>
