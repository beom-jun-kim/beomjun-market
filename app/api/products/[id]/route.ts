import { NextApiRequest, NextApiResponse } from "next";
import { withHandler, ResponseType } from "@/app/libs/server/withHandler";
import client from "@/app/libs/server/client";
import { withApiSession } from "@/app/libs/server/withSession";

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { id } = req.query;
  const product = await client.product.findUnique({
    where: {
      // 문자열을 숫자열로 변환, !: non-null(항상 null이 아니다)
      id: +id!,
    },

    // 유저 정보 포함
    include: {
      user: {
        select: {
          id: true,
          name: true,
          avatar:true,
        },
      },
    },
  });
  res.json({ ok: true, product });
}

export const getProductsRoute = withApiSession(
  withHandler({
    methods: ["GET"],
    handler: GET,
  })
);
