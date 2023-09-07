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
    session: { user },
  } = req;

  // 해당 상품의 id와 현 사용자의 id가 있는지 조회
  const alreadyExists = await client.fav.findFirst({
    where: {
      productId: +id!,
      userId: user?.id,
    },
  });

  // 있다면 해당 상품을 지우고
  if (alreadyExists) {
    await client.fav.delete({
      where: {
        id: alreadyExists.id,
      },
    });
  } else {
    await client.fav.create({
      data: {
        user: {
          connect: {
            id: user?.id,
          },
        },
        product: {
          connect: {
            id: +id!,
          },
        },
      },
    });
  }
  res.json({ ok: true });
}

export const getProductsRoute = withApiSession(
  withHandler({
    methods: ["POST"],
    handler: POST,
  })
);
