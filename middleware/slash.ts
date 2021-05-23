/**
 * Remove trailing slash URL and redirect to that route
 */
export default ({ route, redirect }: any) => {
  if (route.path !== '/' && route.path.endsWith('/')) {
    const { path, query, hash } = route
    const nextPath = path.replace(/\/+$/, '') || '/'
    const nextRoute = { path: nextPath, query, hash }
    redirect(nextRoute)
  }
}
