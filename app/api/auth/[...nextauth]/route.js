// app/api/auth/[...nextauth]/route.js
import NextAuth from "next-auth"
import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google"
import User from "@/models/user";
import payment from "@/models/payment";
import connectDB from "@/db/connectDb";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if(account.provider == "github" || account.provideer ==  "google") { 
       await connectDB()
       // Check if the user already exists in the database
       const currentUser =  await User.findOne({email: email}) 
       if(!currentUser){
         // Create a new user
          const newUser = await User.create({
           email: user.email, 
           username: user.email.split("@")[0], 
         })   
       } 
       return true
      }
   },
   
   async session({ session, user, token }) {
     const dbUser = await User.findOne({email: session.user.email})
     console.log(dbUser)
     session.user.name = dbUser.username
     return session
   },
  }
}

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
