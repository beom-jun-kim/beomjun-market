import { NextApiRequest, NextApiResponse } from "next";
import { withHandler, ResponseType } from "@/app/libs/server/withHandler";
import client from "@/app/libs/server/client";
import { withApiSession } from "@/app/libs/server/withSession";

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { name, price, description },
    session: { user },
  } = req;
  const product = await client.product.create({
    data: {
      name,
      price: +price,
      description,
      image: "",
      user: {
        connect: {
          id: user?.id,
        },
      },
    },
  });
  res.status(200).json({ ok: true, product });
}

export const getProductsRoute = withApiSession(
  withHandler({
    method: "POST",
    handler: POST,
  })
);
