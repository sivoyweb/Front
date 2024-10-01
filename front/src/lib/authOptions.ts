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
        async signIn({ user }) {
          try {
            
            const response = await fetch('https://api-sivoy.onrender.com/auth/signin/google', {
                method:"POST",
                headers:{
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: user.email, 
                    }),
            }); 
            if (!response.ok) {
              console.error('Error al enviar datos al backend:', response.statusText);
              return false;
          }

          const data = await response.json();
          console.log(data);
          
          
          
        
          
          
          return true;
      } catch (error) {
          console.error('Error en signIn callback:', error);
          return false;
      }
  }
},

};