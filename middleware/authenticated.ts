import { APP_ROUTES } from '~/constants/app-routes'

export default (context: any) => {
  const maintenanceMode = context.store.state.isMaintenance
  if (maintenanceMode) {
    return context.redirect(APP_ROUTES.MAINTENANCE)
  } else if (
    context.$auth.$state.loggedIn &&
    (context.route.path === APP_ROUTES.LOGIN ||
      context.route.path === APP_ROUTES.MAINTENANCE)
  ) {
    context.$auth.redirect('home')
  } else if (
    !context.$auth.$state.loggedIn ||
    context.route.path === APP_ROUTES.MAINTENANCE
  ) {
    context.$auth.redirect('login')
  }
}
