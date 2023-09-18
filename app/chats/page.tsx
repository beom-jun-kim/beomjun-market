import type { NextPage } from "next";
import RootLayout from "@/app/layout";

const Chats: NextPage = () => {
  return (
    <RootLayout title="채팅" hasTabBar session>
      {/* // divide : 엘리먼트 사이의 border width를 제어하기 위한 유틸리티 */}
      <div className="py-10 divide-y-[1px] ">
        {[1, 1, 1, 1, 1, 1, 1].map((_, i) => (
          <div
            key={i}
            className="flex px-4 cursor-pointer py-3 items-center space-x-3"
          >
            <div className="w-12 h-12 rounded-full bg-slate-300" />
            <div>
              <p className="text-gray-700">Steve Jebs</p>
              <p className="text-sm  text-gray-500">
                See you tomorrow in the corner at 2pm!
              </p>
            </div>
          </div>
        ))}
      </div>
    </RootLayout>
  );
};

export default Chats;
