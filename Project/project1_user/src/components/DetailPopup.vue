<template>
  <div class="pa-4 text-center">
    <v-dialog
      :model-value="DetailPopupDialog"
      max-width="600"
      max-height="600"
      persistent
    >
      <v-card
        ><div class="PopupTitle">📑 Detail View</div>
        <v-table fixed-header>
          <thead>
            <tr class="column">
              <th class="text-center">ID</th>
              <th class="text-center">NAME</th>
              <th class="text-center">SUBJECT CODE</th>
              <th class="text-center">SUBJECT TITLE</th>
            </tr>
          </thead>
          <tbody>
            <tr class="row" align="center">
              <td>{{ detailData.id }}</td>
              <td>{{ detailData.name }}</td>
              <td>{{ detailData.code }}</td>
              <td>{{ detailData.title }}</td>
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
  name: "DetailPopup",
  data() {
    return {
      detailData: {
        id: "",
        name: "",
        subjectCode: "",
        subjectTitle: "",
      },
    };
  },
  props: {
    DetailPopupDialog: {
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
    DetailPopupDialog(value) {
      console.log("watch");
      if (value) {
        this.loadUserData();
      }
    },
  },
  computed: {
    ...mapGetters({ subjectObjById: "GE_SUBJECT_OBJ_BY_ID" }),
  },
  methods: {
    ...mapActions(["AC_SUBJECT_OBJ_BY_ID"]),
    closeDialog() {
      this.$emit("update:DetailPopupDialog", false);
      this.detailData = {};
    },
    async loadUserData() {
      console.log("id", this.id);
      await this.AC_SUBJECT_OBJ_BY_ID(this.id);
      console.log(this.subjectObjById.code);
      this.detailData = {
        id: this.subjectObjById.id,
        name: this.subjectObjById.name,
        code: this.subjectObjById.code,
        title: this.subjectObjById.title,
      };
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
</style>
