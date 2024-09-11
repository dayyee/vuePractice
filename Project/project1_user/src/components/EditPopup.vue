<template>
  <div class="pa-4 text-center">
    <v-dialog max-width="500" :model-value="EditPopupDialog" persistent>
      <v-card
        ><div class="PopupTitle">👤 User Profile</div>
        <v-form ref="form" v-model="formIsValid">
          <v-card-text>
            <v-col cols="auto" class="cols">
              <v-text-field
                label="NAME"
                v-model="formData.name"
                :rules="user_name_rule"
                required
                :placeholder="userObjById.name"
              ></v-text-field>
            </v-col>

            <v-col cols="auto" class="cols">
              <v-text-field
                label="AGE"
                v-model="formData.age"
                :rules="user_age_rule"
                required
                :placeholder="String(userObjById.age)"
              ></v-text-field>
            </v-col>

            <v-col cols="auto" class="cols">
              <v-text-field
                label="EMAIL"
                v-model="formData.email"
                :rules="user_eamil_rule"
                :placeholder="userObjById.email"
              ></v-text-field>
            </v-col>

            <v-col cols="auto" class="cols">
              <v-text-field
                label="PHONE NUMBER"
                hint="하이픈(-)을 포함해서 작성해주세요."
                persistent-hint
                v-model="formData.phoneNum"
                :rules="user_phoneNum_rule"
                required
                :placeholder="userObjById.phoneNum"
              ></v-text-field>
            </v-col>
          </v-card-text>
        </v-form>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn text="Close" variant="plain" @click="closeDialog"></v-btn>

          <v-btn
            text="Save"
            variant="tonal"
            :disabled="!formIsValid || !isFormChanged"
            @click="confirmPopupOpen"
          ></v-btn>
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
  </div>
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
      originalData: null,
      confirmPopup: false,
      //updateOk: false,
      //updateTitle: "",
      formIsValid: false,
      user_name_rule: [
        (v) => !!v || "이름은 필수 입력사항입니다.",
        (v) => v.length <= 30 || "이름은 30자 이하이어야 합니다.",
        (v) =>
          !/[~!@#$%^&*()_+|<>?:{}]/.test(v) ||
          "이름에는 특수문자를 사용할 수 없습니다.",
      ],
      user_age_rule: [
        (v) => !!v || "나이는 필수 입력사항입니다.",
        (v) => !isNaN(v) || "숫자를 입력하세요.",
        (v) => (v > 0 && v <= 100) || "1~100 사이의 숫자를 입력하세요.",
      ],
      user_eamil_rule: [
        (v) => !!v || "이메일은 필수 입력사항입니다.",
        (v) => /.+@.+\..+/.test(v) || "유효한 이메일 주소를 입력하세요.",
      ],
      user_phoneNum_rule: [
        (v) => !!v || "전화번호는 필수 입력사항입니다.",
        (v) =>
          /\d{2,3}-\d{3,4}-\d{4}/.test(v) ||
          "유효한 전화번호 형식이어야 합니다.",
      ],
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

    // 원본 데이터와 formData가 다른지 비교하여 변경 여부 확인
    isFormChanged() {
      return (
        JSON.stringify(this.formData) !== JSON.stringify(this.originalData)
      );
    },
  },
  methods: {
    ...mapActions(["AC_USER_OBJ_BY_ID", "AC_UPDATE_USER_BY_ID"]),
    closeDialog() {
      this.confirmPopup = false;
      //this.updateOk = false;
      this.$emit("update:EditPopupDialog", false);
    },
    async submitForm() {
      // const validation = await this.$refs.form.validate();
      // const isValid = validation.valid;
      // // 위 두 줄을 한 줄로 하면 const {isValid} = await this.$refs.form.validate();
      // // 한번에 하면 안되는 이유는, .validate()하면 뒤에가 promise를 반환하기에 한번 끊어주고 가야함.
      // console.log("Form is valid:", isValid); //
      // if (isValid) {
      //   console.log(this.formData);
      try {
        const result = await this.AC_UPDATE_USER_BY_ID(this.formData);
        alert(result);
      } catch (err) {
        alert(err);
      }
      this.closeDialog();
      this.formData = {};
    },
    //   else {
    //     alert("입력 정보가 유효한지 확인해주세요.");
    //   }
    // },
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
      // 원본 데이터를 저장
      this.originalData = { ...this.formData };
    },
    confirmPopupOpen() {
      this.confirmPopup = true;
    },
  },
};
</script>

<style></style>
