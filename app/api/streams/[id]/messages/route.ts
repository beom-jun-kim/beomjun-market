import { NextApiRequest, NextApiResponse } from "next";
import { withHandler, ResponseType } from "@/app/libs/server/withHandler";
import client from "@/app/libs/server/client";
import { withApiSession } from "@/app/libs/server/withSession";

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    body,
    session: { user },
  } = req;

  const message = await client.message.create({
    data: {
      message: body.message,
      stream: {
        connect: {
          id: +id!,
        },
      },
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  if (!message) {
    return res.status(404).json({ ok: false });
  }
  return res.json({ ok: true, message });
}

export const getProfileRoute = withApiSession(
  withHandler({
    methods: ["POST"],
    handler: POST,
  })
);
