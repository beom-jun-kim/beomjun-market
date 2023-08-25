import { withIronSessionApiRoute } from "iron-session/next";

// declare module : 모듈의 타입을 확장,타입 정보를 수정하거나 추가할 수 있도록 허용
declare module "iron-session" {
  interface IronSessionData {
    // user라는 객체타입 프로퍼티 추가
    user?: {
      id: number;
    };
  }
}

// 세션 데이터의 저장 방식과 기타 설정에 대한 정보를 담고 있는 객체
const cookieOptions = {
  cookieName: "beomjun_session",
  password: process.env.COOKIE_PASSWORD!,
};

export function withApiSession(fn: any) {
  return withIronSessionApiRoute(fn, cookieOptions);
}
