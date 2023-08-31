import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

export interface WithHandlerConfig {
  method: "GET" | "POST" | "DELETE",
  handler: (req: NextApiRequest, res: NextApiResponse<ResponseType>) => void,
  isPrivate?: boolean
}

// 첫번째 인자로 메서드 , 두번째 인자로 fn
export function withHandler(
  {method,handler,isPrivate} : WithHandlerConfig
) {
  // 먼저 실행되는 함수. 이후 handler return
  return async function (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
  ): Promise<any> {
    // 클라이언트에서 요청한 메서드와 매개변수로 받은 method 비교
    if (req.method !== method) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false });
    }

    // 메서드 일치할시 handler실행
    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  };
}
