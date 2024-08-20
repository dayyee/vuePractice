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

      <el-dialog title="aaa" :visible.sync="isshow" @close="resetisShow">
        <div slot="footer">
          <el-button type="primary" @click="resetisShow"> 확인 </el-button>
        </div>
      </el-dialog>
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
  props: {
    isShow: {
      type: Bosolean,
      default: false,
    },
  },
  components: {
    // slotTest,
  },
  methods: {
    resetisShow() {
      this.$emit("update:isShow", false);
      console.log("=====resetisShow", this.isShow);
    },
  },
};
</script>
