import NextAuth, { DefaultSession } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import prisma from '@/lib/prisma';

declare module 'next-auth' {
	interface Session {
		user: {
			id?: string;
			name?: string;
			email?: string;
			role?: string;
		} & DefaultSession['user'];
	}

	interface User {
		id?: string;
		name?: string;
		email?: string;
		role?: string;
	}
}

export const { handlers, auth, signIn, signOut } = NextAuth({
	session: { strategy: 'jwt' },
	secret: process.env.SECRET_TOKEN,

	providers: [
		Credentials({
			name: 'credentials',
			credentials: {
				username: { label: 'username', type: 'text' },
				password: { label: 'password', type: 'password' },
				role: { label: 'role', type: 'text' },
			},
			async authorize(credentials) {
				console.log('credentials received');

				const { username, password, role } = credentials as {
					username: string;
					password: string;
					role: string;
				};

				let user: {
					id_admin: string;
					password: string;
					nama: string;
				} | null = null;

				switch (role) {
					case 'admin':
						user = (await prisma.admin.findFirst({
							where: {
								id_admin: username,
								password,
							},
						})) as {
							id_admin: string;
							password: string;
							nama: string;
						};
						break;

					default:
						break;
				}

				if (!user) return null;

				return {
					id: user.id_admin || '',
					name: user.nama || '',
					role: role || '',
					email: '',
				};
			},
		}),
	],

	callbacks: {
		async jwt({ token, user }) {
			if (user) Object.assign(token, user);
			return token;
		},

		async session({ session, token }) {
			session.user = { ...session.user, ...token } as any;
			return session;
		},
	},

	pages: {
		signIn: '/login',
	},
});
