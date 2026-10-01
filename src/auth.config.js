// Edge-safe config shared by middleware and the full Auth.js setup in auth.js.
// Keep database and bcrypt imports out of this file.

export const AUTH_PATHS = ['/login', '/register']
export const HOME_PATH = '/app'

export const authConfig = {
  pages: { signIn: '/login' },
  session: { strategy: 'jwt' },
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = Boolean(auth?.user)
      const isAuthPage = AUTH_PATHS.some((path) => nextUrl.pathname.startsWith(path))

      if (isAuthPage) {
        return isLoggedIn ? Response.redirect(new URL(HOME_PATH, nextUrl)) : true
      }

      return isLoggedIn
    },
    jwt({ token, user }) {
      if (user) token.id = user.id
      return token
    },
    session({ session, token }) {
      if (token?.id) session.user.id = token.id
      return session
    },
  },
}
