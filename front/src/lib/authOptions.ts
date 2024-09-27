import { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions:NextAuthOptions = {
    providers:[
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        })
       ], 
       callbacks: {
        async signIn({ user, account }) {
          try {
            // Enviar datos del usuario a tu backend en NestJS
            const response = await fetch('http://localhost:3000/auth/signin/google', {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({name: user.name,
                    email: user.email,
                    token: account?.id_token, 
                    }),
            }); 
            const contentType = response.headers.get('content-type');
            if (contentType && contentType.includes('application/json')) {
              const data = await response.json();
              return data;
            }
            const textData = await response.text();
            return { message: textData };
          } catch (error: unknown) {
            console.error('Error en signIn callback:', error);
            return false;
          }
        }
    }
}