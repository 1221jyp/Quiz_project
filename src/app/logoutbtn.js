"use client";
import "./globals.css";
import { signOut } from "next-auth/react";
export default function LogoutBtn() {
  return (
    <button
      className="nav_btn login_btn_color"
      onClick={() => {
        signOut();
      }}
    >
      로그아웃
    </button>
  );
}
