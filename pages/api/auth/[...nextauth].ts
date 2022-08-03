import axios from 'axios'
import NextAuth, { Session } from 'next-auth'
import { Provider } from 'next-auth/providers'
import CredentialsProvider from 'next-auth/providers/credentials'

const providers: Provider[] = [
  CredentialsProvider({
    id: 'credentials',
    name: 'reactui.dev',
    type: 'credentials',
    credentials: {
      email: {
        label: 'Email Address',
        type: 'email',
      },
      password: {
        label: 'Password',
        type: 'password',
      },
    },
    async authorize(credentials) {
      return await axios
        .post(`${process.env.API_URL}/auth/login`, credentials)
        .then((res) => {
          return res.data
        })
        .catch((err) => {
          throw new Error(err.response?.data?.message)
        })
    },
  }),
]

export default NextAuth({
  session: {
    strategy: 'jwt',
  },
  pages: {
    signIn: '/auth/login',
    signOut: '/auth/logout',
    error: '/auth/error',
  },
  providers,
  callbacks: {
    async jwt({ token, user }) {
      if (!user) {
        return token
      }
      const existingUser: any = await axios.get(
        `${process.env.API_URL}/auth/me`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      )
      if (!existingUser) {
        return token
      }
      return {
        id: existingUser.data.id,
        name: existingUser.data.name,
        username: existingUser.data.username,
        email: existingUser.data.email,
      }
    },
    async session({ session, token }) {
      const reactuiSession: Session = {
        ...session,
        user: {
          ...session.user,
          id: token.id as number,
          name: token.name,
          username: token.username as string,
        },
      }
      return reactuiSession
    },
  },
})
