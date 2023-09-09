import { NextApiRequest, NextApiResponse } from "next";
import { withHandler, ResponseType } from "@/app/libs/server/withHandler";
import client from "@/app/libs/server/client";
import { withApiSession } from "@/app/libs/server/withSession";

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    query: { id },
    session: { user },
  } = req;

  const wonderExists = await client.wondering.findFirst({
    where: {
      userId: user?.id,
      postId: +id!,
    },
    select: {
      id: true,
    },
  });
  if (wonderExists) {
    await client.wondering.delete({
      where: {
        id: wonderExists.id,
      },
    });
  } else {
    await client.wondering.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        post: {
          connect: {
            id: +id!,
          },
        },
      },
    });
  }
  return res.status(200).json({ ok: true, wonderExists });
}

export const getProfileRoute = withApiSession(
  withHandler({
    methods: ["GET"],
    handler: GET,
  })
);
