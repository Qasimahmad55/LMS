// import { Geist, Geist_Mono } from "next/font/google";
'use client'
import "./globals.css";
import { Poppins } from "next/font/google";
import { Josefin_Sans } from "next/font/google";
import ThemeProvider from "./utils/Theme-provider";
import { Toaster } from "react-hot-toast";
import { Providers } from '../Provider'
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Poppins",

})

const josefin = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-Josefin",
});

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

// export const metadata: Metadata = {
//   title: "ELearning",
//   description: "ELearning is a platform for students to learn and get help from teachers",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${poppins.variable} ${josefin.variable} overflow-hidden bg-white! bg-no-repeat dark:bg-linear-to-b dark:from-gray-900 dark:to-black duration-300`}>
        <Providers>
          <ThemeProvider attribute='class' defaultTheme="system" enableSystem>
            {children}
            <Toaster position="top-center" reverseOrder={false} />
          </ThemeProvider>
        </Providers>

      </body>
    </html>
  );
}
