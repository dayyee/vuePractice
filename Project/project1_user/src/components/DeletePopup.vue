<template>
  <div class="text-center pa-4">
    <v-dialog :model-value="DeletePopupDialog" max-width="400" persistent>
      <v-card text="삭제하시겠습니까?" title="🗑️ Delete">
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn @click="closeDialog" variant="plain"> Cancle </v-btn>
          <v-btn @click="DeleteInfo" variant="tonal"> Ok </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: "DeletePopup",
  data() {
    return {};
  },
  props: {
    DeletePopupDialog: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    closeDialog() {
      this.$emit("update:DeletePopupDialog", false);
    },
    DeleteInfo() {
      console.log("삭제");
      this.closeDialog();
    },
  },
};
</script>
<style></style>
