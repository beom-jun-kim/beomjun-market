import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { withHandler, ResponseType } from "@/app/libs/server/withHandler";
import client from "@/app/libs/server/client";

declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  try {
    console.log(req.session);
    const { token } = await req.body;

    const exists = await client.token.findUnique({
      where: {
        payload: token,
      },
    });

    if (!exists) {
      return res.status(400).end();
    }

    // user는 세션 데이터에서 유저정보 객체
    req.session.user = {
      id: exists.userId,
    };

    // 세션에 저장한 변경 사항이 실제 서버에 반영
    await req.session.save();
    res.status(200).json({ ok: true, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ ok: false, error: "error" });
  }
}

export const getProfileRoute = withIronSessionApiRoute(POST, {
  cookieName: "beomjun_session",
  password:
    "548213218495413214654546546584984545641324132131546542513215884231",
});

// 1. 유저 로그인시 서버는 세션 데이터 저장
// 2. 이 세션 id를 클라이언트의 쿠키로 저장 (쿠키는 텍스트파일로 저장되는 데이터 조각)
// 3. 유저의 요청마다 브라우저는 쿠키에 저장된 세션 id 서버로 전송
// 4. 전송받은 세션 id를 통해 해당 세션의 데이터를 찾아서 활용
