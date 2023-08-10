import type { NextPage } from "next";
import RootLayout from "@/app/layout";

const Live: NextPage = () => {
  return (
    <RootLayout title="라이브" hasTabBar>
      <div className="py-10 divide-y-[1px] space-y-4">
        {[1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <div className="pt-4  px-4" key={i}>
            {/* 
              aspect : 요소의 종횡비를 제어하기 위한 유틸리티 또는 대괄호를 사용하여 새로운 속성을 생성할 수도 있습니다.
              aspect-auto => aspect-ratio: auto;
              aspect-square => aspect-ratio: 1 / 1;
              aspect-video => aspect-ratio: 16 / 9; 
          */}
            <div className="w-full rounded-md shadow-sm bg-slate-300 aspect-video" />
            <h1 className="text-2xl mt-2 font-bold text-gray-900">
              Galaxy S50
            </h1>
          </div>
        ))}
        <button className="fixed hover:bg-orange-500 transition-colors cursor-pointer  bottom-24 right-5 shadow-xl bg-orange-400 rounded-full p-4 border-transparent text-white">
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
        </button>
      </div>
    </RootLayout>
  );
};

export default Live;
