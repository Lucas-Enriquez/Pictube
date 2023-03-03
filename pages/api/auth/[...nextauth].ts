/* eslint-disable */

import NextAuth, { NextAuthOptions, User } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import GoogleProvider from 'next-auth/providers/google'

export const authOptions: NextAuthOptions = {
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET
		})
	],
	secret: process.env.NEXTAUTH_SECRET,

	pages: {
		signIn: '/login'
	},
	callbacks: {
		async jwt({ token, account, profile, user }) {
			// Persist the OAuth access_token and or the user id to the token right after signin
			if (account) {
				token.accessToken = account.access_token
				token.id = user.id
			}
			return token
		},
		async session({
			session,
			token,
			user
		}: {
			session: any
			token: JWT
			user: User
		}) {
			// Send properties to the client, like an access_token and user id from a provider.
			if (session.accessToken) session.accessToken = token.accessToken
			session.user.id = token.id

			return session
		}
	}
}
export default NextAuth(authOptions)
