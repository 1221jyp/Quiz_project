import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quiz time!",
  description: "my quiz project",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="header">
          <Link href="/" className="title">
            Quiz time!
          </Link>
          <Link href="/newquiz" className="nav_btn">
            퀴즈 만들기
          </Link>
          <Link href="/quiz" className="nav_btn">
            퀴즈 풀기
          </Link>
          <button onClick="" className="login_btn">
            로그인
          </button>
        </div>
        {children}
      </body>
    </html>
  );
}
