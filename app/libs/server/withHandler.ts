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

// protect handler
export function withHandler(
  {method,handler,isPrivate} : WithHandlerConfig
) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
  ): Promise<any> {
    if (req.method !== method) {
      return res.status(405).end();
    }
    if (isPrivate && !req.session.user) {
      return res.status(401).json({ ok: false });
    }

    try {
      await handler(req, res);
    } catch (error) {
      console.log(error);
      return res.status(500).end();
    }
  };
}
