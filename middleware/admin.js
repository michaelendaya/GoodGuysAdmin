export default function ({ $auth, redirect }) {
    // If the user is not authenticated
    if (!$auth.$state.user.isAdmin) {
      return redirect('/test')
    }
  }