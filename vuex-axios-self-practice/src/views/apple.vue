<template>
  <div>
    <slotTest>
      <template v-slot:varName
        >나는 부모야. 자식 컴포넌트에게 이 내용을 보여줘</template
      >
    </slotTest>
  </div>
</template>

<script>
import slotTest from "../components/Homes/slotTest.vue";
export default {
  components: {
    slotTest,
  },
};
</script>
