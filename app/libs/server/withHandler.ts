import { NextApiRequest, NextApiResponse } from "next";

// 첫번째 인자로 메서드 , 두번째 인자로 fn
export default function withHandler(method: "GET" | "POST" | "DELETE",fn: (req: NextApiRequest, res: NextApiResponse) => void) {

  // 먼저 실행되는 함수. 이후 handler return
  return async function (req: NextApiRequest, res: NextApiResponse) {

    // 클라이언트에서 요청한 메서드와 매개변수로 받은 method 비교
    if (req.method !== method) {
      return res.status(405).end();
    }

    // 메서드 일치할시 handler실행
    try {
      await fn(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error });
    }
  };
}