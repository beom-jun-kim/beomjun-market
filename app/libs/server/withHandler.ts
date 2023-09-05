import { NextApiRequest, NextApiResponse } from "next";
// import { NextApiRequest, NextApiResponse } from "next";

export interface ResponseType {
  ok: boolean;
  [key: string]: any;
}

type method = "GET" | "POST" | "DELETE";

export interface WithHandlerConfig {
  methods: method[],
  handler: (req: NextApiRequest, res: NextApiResponse<ResponseType>) => void,
  isPrivate?: boolean
}

export function withHandler(
  {methods,handler,isPrivate} : WithHandlerConfig
) {
  return async function (
    req: NextApiRequest,
    res: NextApiResponse<ResponseType>
  ): Promise<any> {
    if (req.method && !methods.includes(req.method as any)) {
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