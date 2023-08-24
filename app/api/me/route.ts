import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import { withHandler, ResponseType } from "@/app/libs/server/withHandler";
import client from "@/app/libs/server/client";

// declare module : 모듈의 타입을 확장,타입 정보를 수정하거나 추가할 수 있도록 허용
declare module "iron-session" {
  interface IronSessionData {

    // user라는 객체타입 프로퍼티 추가
    user?: {
      id: number;
    };
  }
}

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  try {
    console.log(req.session.user);
    const profile = await client.user.findUnique({
      where: {
        id: req.session.user?.id,
      },
    });
    res.status(200).json({ ok: true, profile });
  } catch(error){
    console.log(error);
    res.status(500).json({ok:false,error:"error"});
  }
}

export const getProfileRoute = withIronSessionApiRoute(GET, {
  cookieName: "beomjun_session",
  password:
    "548213218495413214654546546584984545641324132131546542513215884231",
});
