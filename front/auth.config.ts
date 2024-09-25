import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// Configurar NextAuth con el proveedor de Google
export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  pages: {
    signIn: '/register', 
  },
};

export default NextAuth(authOptions);