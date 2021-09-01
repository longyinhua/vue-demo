<template>
  <div>123 {{ h1 }}</div>
</template>
<script lang="ts">
  export default {
    data: function () {
      return {
        h1: 'String',
      }
    },
    created() {
      let strjs = '测试js'
      let strts: string = '测试ts'
      console.log(strts)
      console.log(strjs)
    },
  }
</script>
<style scoped></style>
