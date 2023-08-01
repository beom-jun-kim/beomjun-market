"use client";

import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cls } from "./libs/utils";
import Link from "next/link";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

interface LayoutProps {
  title?: string;
  hasTabBar?: boolean;
  canGoBack?: boolean;
  children: React.ReactNode;
}

export default function RootLayout({
  children,
  title,
  hasTabBar,
  canGoBack,
}: LayoutProps) {
  const router = useRouter();
  const backButton = () => {
    // router.back() : 브라우저의 뒤로 버튼을 클릭하는 것
    // router.push() : 클라이언트 측 전환을 처리
    router.back();
  };

  return (
    <html lang="en">
      <body className={inter.className}>
        <div
          className={cls(
            !canGoBack ? "justify-center" : "px-6",
            "bg-white w-full text-xl font-semibold py-6 fixed text-gray-700 border-0 top-0 left-0 flex items-center border-b"
          )}
        >
          {canGoBack ? <button onClick={backButton}>←</button> : null}
          {title ? <span>{title}</span> : null}
        </div>
        <div className={cls("pt-28", hasTabBar ? "pb-4" : "")}>{children}</div>
        {hasTabBar ? (
          <nav className="w-full bg-white text-gray-800 border-t fixed left-0 bottom-0 py-5 flex justify-center items-center">
            <ul className="max-w-lg w-full flex justify-around items-center">

              {/* 홈 */}
              <li>
                <Link href="/" className="flex flex-col items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
                    />
                  </svg>
                  <span className="text-[12px] mt-1">홈</span>
                </Link>
              </li>

              {/* 동네생활 */}
              <li>
                <Link href="/community" className="flex flex-col items-center">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
                    ></path>
                  </svg>
                  <span className="text-[12px] mt-1">동네생활</span>
                </Link>
              </li>

              {/* 채팅 */}
              <li className="text-center">
                <Link href="/chats" className="flex flex-col items-center">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    ></path>
                  </svg>
                  <span className="text-[12px] mt-1">채팅</span>
                </Link>
              </li>

              {/* 라이브 */}
              <li className="text-center">
                <Link href="/live" className="flex flex-col items-center">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                    ></path>
                  </svg>
                  <span className="text-[12px] mt-1">라이브</span>
                </Link>
              </li>

              {/* 나의 당근 */}
              <li className="text-center">
                <Link href="/profile" className="flex flex-col items-center">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    ></path>
                  </svg>
                  <span className="text-[12px] mt-1">나의 당근</span>
                </Link>
              </li>
            </ul>
          </nav>
        ) : null}
      </body>
    </html>
  );
}
