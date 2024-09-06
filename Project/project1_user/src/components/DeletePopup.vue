<template>
  <div class="text-center pa-4">
    <v-dialog :model-value="DeletePopupDialog" max-width="400" persistent>
      <v-card>
        <template v-slot:title>🗑️ Delete</template>
        <template v-slot:text
          >id : {{ id }}의 정보를 삭제하시겠습니까?</template
        >
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeDialog" variant="plain"> Cancle </v-btn>
          <v-btn @click="confirmPopupOpen" variant="tonal"> Ok </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    <div class="text-center pa-4">
      <v-dialog :model-value="confirmPopup" max-width="250" persistent>
        <v-card text="정말 삭제하시겠습니까?" color="red" title="✓ check">
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn @click="closeDialog" variant="plain"> Cancle </v-btn>
            <v-btn @click="DeleteInfo(id)" variant="tonal"> Ok </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "DeletePopup",
  data() {
    return {
      confirmPopup: false,
    };
  },
  props: {
    DeletePopupDialog: {
      type: Boolean,
      required: true,
    },
    id: {
      type: Number,
      required: true,
    },
  },
  methods: {
    ...mapActions(["AC_REMOVE_USER_BY_ID"]),
    closeDialog() {
      this.confirmPopup = false;
      this.$emit("update:DeletePopupDialog", false);
    },
    confirmPopupOpen() {
      this.confirmPopup = true;
    },
    async DeleteInfo(id) {
      console.log(id);
      const result = await this.AC_REMOVE_USER_BY_ID(id);
      if (result) {
        alert(result);
      }
      this.closeDialog();
    },
  },
};
</script>
<style></style>
