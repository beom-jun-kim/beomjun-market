import { withIronSessionApiRoute } from "iron-session/next";
import { NextApiRequest, NextApiResponse } from "next";
import withHandler, { ResponseType } from "@/app/libs/server/withHandler";
import client from "@/app/libs/server/client";

async function POST(req: NextApiRequest, res: NextApiResponse<ResponseType>) {

  // session :  서버측에서 유저의 상태를 유지하고 관리
  console.log(req.session);
  const { token } = await req.body;

  // findUnique : 고유한 값을 조회
  // 유저가 입력한 토큰 값과 데이터 베이스에 저장된 토큰 값 비교
  const exists = await client.token.findUnique({
    where: {
      payload: token,
    },
  });

  if (!exists) {
    res.status(400).end();
  }

  // 인증이 완료된 유저 데이터 세션에 저장
  // 로그인 상태의 유지를 위해 유저의 식별 정보를 세션에 저장
  req.session.user = {

    // exists에 저장된 userId을 추출 후 객체로 생성 (token모델 참조)
    // exists가 존재하면 userId사용, 아니면 undefined 반환
    id: exists?.userId
  };

  // 세션에 저장한 변경 사항이 실제 서버에 반영
  await req.session.save();
  return res.status(200).end();
}

export default withIronSessionApiRoute(withHandler("POST", POST), {
  cookieName: "beomjun_session",
  password:
    "548213218495413214654546546584984545641324132131546542513215884231",
});


// 1. 유저 로그인시 서버는 세션 데이터 저장 
// 2. 이 세션 id를 클라이언트의 쿠키로 저장 (쿠키는 텍스트파일로 저장되는 데이터 조각)
// 3. 유저의 요청마다 브라우저는 쿠키에 저장된 세션 id 서버로 전송
// 4. 전송받은 세션 id를 통해 해당 세션의 데이터를 찾아서 활용