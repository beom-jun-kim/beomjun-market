import { NextApiRequest, NextApiResponse } from "next";
import { withHandler, ResponseType } from "@/app/libs/server/withHandler";
import client from "@/app/libs/server/client";
import { withApiSession } from "@/app/libs/server/withSession";
import { GET } from "../me/route";

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  if (req.method === "GET") {
    const product = await client.product.findMany({
      include: {
        _count: {
          select: {
            favs: true,
          },
        },
      },
    });
    res.json({ ok: true, product });
  }
  if (req.method === "POST") {
    const {
      body: { name, price, description, photoId },
      session: { user },
    } = req;
    const product = await client.product.create({
      data: {
        name,
        price: +price,
        description,
        image: photoId,
        user: {
          connect: {
            id: user?.id,
          },
        },
      },
    });
    res.status(200).json({ ok: true, product });
  }
}

export const getProductsRoute = withApiSession(
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
