import { NextRequest, NextResponse } from "next/server";
import withHandler from "@/app/libs/server/withHandler";
import client from "@/app/libs/server/client";

export const POST = async (req: NextRequest) => {
  const { email, phone } = await req.json();
  const payload = phone ? { phone: +phone } : { email };

  // upsert : 데이터 생성 및 수정(사용자 레코드를 업데이트, 존재하지 않는 경우 생성)
  const user = await client.user.upsert({
    where: {

      // 데이터가 존재하는지 확인, 존재하면 update 실행
      ...payload,
    },

    // 데이터가 존재하지 않으면 생성
    create: {
      name: "beomjun",
      ...payload,
    },

    // 아무것도 내보내지 않기에 빈 객체
    update: {},
  });

  return NextResponse.json(user, { status: 200 });
};

export default withHandler("POST", POST);
