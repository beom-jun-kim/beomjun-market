import { NextApiRequest, NextApiResponse } from "next";
import { withHandler, ResponseType } from "@/app/libs/server/withHandler";
import client from "@/app/libs/server/client";
import { withApiSession } from "@/app/libs/server/withSession";
import { GET } from "../me/route";

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { question },
    session: { user },
  } = req;

  if (req.method === "POST") {
    const post = await client.post.create({
      data: {
        question,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.json({ ok: true, post });
  }
  if (req.method === "GET") {
    const posts = await client.post.findMany({
      include:{
        user:{
          select:{
            id:true,
            name:true,
            avatar:true,
          }
        },
        _count:{
          select:{
            wondering:true,
            answers:true,
          }
        }
      }
    });
    res.json({ ok: true, posts });
  }
}

export const getProfileRoute = withApiSession(
  withHandler({
    methods: ["POST", "GET"],
    handler: (req, res) => {
      if (req.method === "GET") {
        return GET(req, res);
      } else if (req.method === "POST") {
        return POST(req, res);
      }
    },
  })
);
