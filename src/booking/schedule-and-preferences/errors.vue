<template>
  <div class="errors" v-if="errorMessage">
    <p>{{ errorMessage }}</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      errorMessage: undefined,
    }
  },

  created() {
    this.$root.$on('error', msg => {
      this.errorMessage = msg
    })
  },
}
</script>

<style lang="less">
.errors {
  background-color: white;
  color: red;
  margin: 10px;
  padding: 10px;
  text-align: center;
}
</style>
