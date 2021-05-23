export default ({ $axios }: any) => {
  $axios.interceptors.request.use(
    (config: any) => {
      return config
    },
    (err: any) => {
      return Promise.reject(err)
    }
  )

  $axios.interceptors.response.use(
    (res: any) => {
      return res
    },
    (err: any) => {
      return Promise.reject(err)
    }
  )
}
