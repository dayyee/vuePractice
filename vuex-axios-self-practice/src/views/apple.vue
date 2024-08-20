<template>
  <div>
    <slotTest>
      <template v-slot:varName
        >나는 부모야. 자식 컴포넌트에게 이 내용을 보여줘</template
      >
    </slotTest>

    <div>
      <el-button type="text" @click="open"
        >Click to open the Message Box</el-button
      >
    </div>
  </div>
</template>

<script>
import slotTest from "../components/Homes/slotTest.vue";
export default {
  data() {
    return {
      dialogVisible: false,
    };
  },
  components: {
    slotTest,
  },
  methods: {
    open() {
      this.$alert("This is a message", "Title", {
        confirmButtonText: "OK",
        callback: (action) => {
          this.$message({
            type: "info",
            message: `action: ${action}`,
          });
        },
      });
    },
  },
};
</script>
