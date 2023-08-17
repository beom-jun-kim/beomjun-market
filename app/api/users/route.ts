import { NextRequest, NextResponse } from "next/server";
import withHandler from "@/app/libs/server/withHandler";
import client from "@/app/libs/server/client";

export const POST = async (req: NextRequest) => {
  const { email, phone } = await req.json();
  const payload = phone ? { phone: +phone } : { email };

  // ※ connectOrCreate로 user생성 및 토큰 연결까지 해주기에 필요X
  // // upsert : 데이터 생성 및 수정(사용자 레코드를 업데이트, 존재하지 않는 경우 생성)
  // const user = await client.user.upsert({
  //   where: {
  //     // 데이터가 존재하는지 확인, 존재하면 update 실행
  //     ...payload,
  //   },

  //   // 데이터가 존재하지 않으면 생성
  //   create: {
  //     name: "beomjun",
  //     ...payload,
  //   },

  //   // 아무것도 내보내지 않기에 빈 객체
  //   update: {},
  // });

  const token = await client.token.create({
    // data: ctrl +클릭 , 값에 user가 꼭 필요하다고 나온다(TokenCreateInput)
    data: {
      payload: "1234",

      // token 생성시 user와 연결
      user: {

        // connectOrCreate : user가 있을 경우 token연결. 없으면 생성 후 연결
        connectOrCreate: {
          where: {
            // 데이터가 존재하는지 확인, 존재하면 update 실행
            ...payload,
          },
      
          // 데이터가 존재하지 않으면 생성
          create: {
            name: "beomjun",
            ...payload,
          },
        },
      },
    },
  }); /* => user를 upsert하고 token생성 후 upsert했던 user와 token연결 */

  // token을 추가하면 client가 새로 생성됨 => 서버 재시작

  console.log(token);

  return NextResponse.json(token, { status: 200 });
};

export default withHandler("POST", POST);
