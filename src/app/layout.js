import Link from "next/link";
import "./globals.css";
import { Inter } from "next/font/google";
import LoginBtn from "./loginbtn";
import LogoutBtn from "./logoutbtn";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Quiz time!",
  description: "my quiz project",
};

export default async function RootLayout({ children }) {
  let session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="header">
          <Link href="/" className="title">
            Quiz time!
          </Link>
          <Link href="/newquiz" className="nav_btn nav_btn_color">
            퀴즈 만들기
          </Link>
          <Link href="/quiz" className="nav_btn nav_btn_color">
            퀴즈 풀기
          </Link>
          <Link href="/ranking" className="nav_btn nav_btn_color">
            순위판
          </Link>
          {session ? (
            <>
              <LogoutBtn></LogoutBtn>
              <h2 className="UserName">{session.user.name}님, 환영합니다!</h2>
            </>
          ) : (
            <LoginBtn></LoginBtn>
          )}
        </div>
        {children}
      </body>
    </html>
  );
}
