import { NextApiRequest, NextApiResponse } from "next";


export interface ResponseType {
  ok:boolean;
  [key:string]:any;
}

// 첫번째 인자로 메서드 , 두번째 인자로 fn
export function withHandler(
  method: "GET" | "POST" | "DELETE",

  // fn 함수 자체는 값을 반환할 필요가 X 요청과 응답을 처리하는 역할만 수행
  fn: (req: NextApiRequest, res: NextApiResponse<ResponseType>) => void
) {

  // 먼저 실행되는 함수. 이후 handler return
  return async function (req: NextApiRequest, res: NextApiResponse<ResponseType>) {
    
    // 클라이언트에서 요청한 메서드와 매개변수로 받은 method 비교
    if (req.method !== method) {
      return res.status(405).end();
    }

    // 메서드 일치할시 handler실행
    try {
      await fn(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  };
}
