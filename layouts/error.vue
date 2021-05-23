<template>
  <div class="container">
    <div class="inner">
      <div class="title--error">{{ error.statusCode }}</div>
      <div class="text--error">{{ error.message }}</div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  props: {
    error: {
      type: Object,
      default() {
        return {
          statusCode: '404',
          title: 'Error',
          message: 'Page not found'
        }
      }
    }
  }
}
</script>

<style>
.title--error {
  font-size: 7rem;
  font-weight: bold;
}
.text--error {
  font-size: 1.2rem;
}
</style>
