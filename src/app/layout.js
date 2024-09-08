import { Inter } from "next/font/google";
import "./globals.css";
 

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Small ERB",
  description: "Testing",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
       <body className={inter.className}>
                {children}
         </body>
    </html>
  );
}
