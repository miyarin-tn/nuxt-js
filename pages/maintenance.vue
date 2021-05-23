<template>
  <div class="container">
    <h2 class="t-leter">We'll be back soon!</h2>
    <div class="txt-leter">
      Sorry for the inconvenience but we're performing some maintenance at the
      moment.<br />
      If you need to you can always contact us, otherwise we'll be back online
      shortly!
    </div>
    <div class="end-leter">-- Admin</div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'Maintenance'
})
</script>

<style lang="scss">
.t-leter {
  font-size: 4rem;
  letter-spacing: -0.1rem;
  margin-bottom: 1.5rem;
}
.txt-leter {
  font-size: 1.2rem;
  color: #333;
  margin-bottom: 1rem;
}
.end-leter {
  color: #333;
}
</style>
