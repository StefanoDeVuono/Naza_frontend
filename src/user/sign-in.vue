<template>
  <div class="sign-in form-wrapper">
    <SignInForm :onSubmit="onSubmit" />
  </div>
</template>

<script>
import SignInForm from './sign-in-form.vue'

export default {
  methods: {
    onSubmit() {
      this.$router.push({
        name: 'categories',
      })
    }
  },
  components: {
    SignInForm
  }
}
</script>

<style lang="less">
</style>
