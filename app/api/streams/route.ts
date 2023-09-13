import { NextApiRequest, NextApiResponse } from "next";
import { withHandler, ResponseType } from "@/app/libs/server/withHandler";
import client from "@/app/libs/server/client";
import { withApiSession } from "@/app/libs/server/withSession";
// import { POST } from "../posts/route";
import { GET } from "../me/route";

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    session: { user },
    body: { name, price, description },
  } = req;
  if (req.method === "POST") {
    const stream = await client.stream.create({
      data: {
        name,
        price,
        description,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    return res.json({ ok: true, stream });
  } else if (req.method === "GET") {
    const streams = await client.stream.findMany({
      take: 10,
      skip: 10,
    });
    res.json({ ok: true, streams });
  }
}

export const getProfileRoute = withApiSession(
  withHandler({
    methods: ["GET", "POST"],
    handler: (req, res) => {
      if (req.method === "GET") {
        return GET(req, res);
      } else if (req.method === "POST") {
        return POST(req, res);
      }
    },
  })
);
