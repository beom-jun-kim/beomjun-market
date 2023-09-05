import { NextApiRequest, NextApiResponse } from "next";
import { withHandler, ResponseType } from "@/app/libs/server/withHandler";
import client from "@/app/libs/server/client";
import { withApiSession } from "@/app/libs/server/withSession";
import { workerData } from "worker_threads";

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
        // 어떤 데이터를 포함 시킬지
        select: {
          id: true,
          name: true,
          avatar: true,
        },
      },
    },
  });

  // 상품 이름의 단어로 단위로 나눔
  const wordSpace = product?.name.split(" ").map((splitWord) => ({
    name: {
      contains: splitWord,
    },
  }));

  // 비슷한 이름의 상품 조회
  const relatedProducts = await client.product.findMany({
    where: {
      OR: wordSpace,
      AND: {
        id: {
          not: product?.id,
        },
      },
    },

    //최근에 올라온 상품을 기준으로
    orderBy:{
      created:"desc",
    },

    // 특정 갯수만큼
    take:4,
  });

  res.json({ ok: true, product, relatedProducts });
}

export const getProductsRoute = withApiSession(
  withHandler({
    methods: ["GET"],
    handler: GET,
  })
);
