<template>
  <div class="container">
    <div>
      <form @submit.prevent="doLogin">
        <div class="mb-10">
          <input
            v-model="form.email"
            type="text"
            placeholder="email"
            class="field--normal"
          />
        </div>
        <div class="mb-20">
          <input
            v-model="form.password"
            type="password"
            placeholder="password"
            class="field--normal"
          />
        </div>
        <button class="button--green" type="submit">Login</button>
      </form>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters, mapActions } from 'vuex'
import { API_ROUTES } from '~/constants/api-routes'
import { NAMESPACE } from '~/constants/configs'

export default Vue.extend({
  name: 'Login',
  layout: 'app',
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  computed: {
    ...mapGetters(NAMESPACE.settings, ['getLanguage'])
  },
  methods: {
    ...mapActions(['setCredential', 'setUserInfo']),
    async doLogin() {
      try {
        const data = await this.$axios.post(
          `${API_ROUTES.BASE_API}${API_ROUTES.LOCAL_SERVER_LOGIN}`,
          {
            email: this.form.email,
            password: this.form.password
          },
          {
            baseURL: '/'
          }
        )
        await this.setCredential(data.data)
        await this.$auth.setUserToken(data.data.access)
        await this.setUserInfo()
      } catch (e) {}
    }
  }
})
</script>

<style lang="scss" scoped>
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
}
.field--normal {
  padding: 5px 10px;
  width: 300px;
  height: 30px;
}
.mb-10 {
  margin-bottom: 10px;
}
.mb-20 {
  margin-bottom: 20px;
}
</style>
