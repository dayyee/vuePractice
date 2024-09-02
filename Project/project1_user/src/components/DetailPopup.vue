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
              <th class="text-center">CODE</th>
              <th class="text-center">TITLE</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="item in jointable"
              :key="item.id"
              class="row"
              align="center"
            >
              <td>{{ item.id }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.code }}</td>
              <td>{{ item.title }}</td>
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
export default {
  name: "DetailPopup",
  data() {
    return {
      jointable: [
        {
          id: 1,
          name: "어쩌고",
          code: 10,
          title: "세계사",
        },
        {
          id: 2,
          name: "저쩌고",
          code: 20,
          title: "한국사",
        },
        {
          id: 2,
          name: "저쩌고",
          code: 20,
          title: "한국사",
        },
        {
          id: 2,
          name: "저쩌고",
          code: 20,
          title: "한국사",
        },
        {
          id: 2,
          name: "저쩌고",
          code: 20,
          title: "한국사",
        },
        {
          id: 2,
          name: "저쩌고",
          code: 20,
          title: "한국사",
        },
        {
          id: 2,
          name: "저쩌고",
          code: 20,
          title: "한국사",
        },
      ],
    };
  },
  props: {
    DetailPopupDialog: {
      type: Boolean,
      required: true,
    },
  },
  created() {},
  methods: {
    closeDialog() {
      this.$emit("update:DetailPopupDialog", false);
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
