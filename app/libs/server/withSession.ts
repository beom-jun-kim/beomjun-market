import { withIronSessionApiRoute } from "iron-session/next";
import type { IronSessionOptions } from "iron-session";

// declare module : 모듈의 타입을 확장,타입 정보를 수정하거나 추가할 수 있도록 허용
declare module "iron-session" {
  interface IronSessionData {
    user?: {
      id: number;
    };
  }
}

const cookieOptions: IronSessionOptions = {
  cookieName: "beomjun_session",
  password: process.env.COOKIE_PASSWORD!,
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
  },
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}

