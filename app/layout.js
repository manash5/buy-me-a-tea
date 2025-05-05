import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SessionWrapper from "@/components/SessionWrapper";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Buy-me-a-tea",
  description: "This website is a crowdfunding platform for developers",
}; 

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionWrapper>
          <Navbar/>
          <div className="relative h-[90vh] w-full bg-slate-950 overflow-x-hidden overflow-y-visible scrollbar-dark text-white  ">
            {/* Left background blob */}
            <div className="absolute z-0 bottom-0 left-[-20%] right-0 top-[-10%] h-[500px] w-[500px] rounded-full 
                        bg-[radial-gradient(circle_farthest-side,rgba(75,0,130,0.3),rgba(0,0,0,0.1))] pointer-events-none"></div>

            {/* Right background blob */}
            <div className="absolute z-0 bottom-0 right-[-20%] top-[-10%] h-[500px] w-[500px] rounded-full 
                        bg-[radial-gradient(circle_farthest-side,rgba(0,0,139,0.3),rgba(0,0,0,0.1))] pointer-events-none"></div>

            {/* Content goes here */}
            <div className=" z-10">
              {children}
            </div>
          </div>

          <Footer/>
        </SessionWrapper>
      </body>
    </html>
  );
}
