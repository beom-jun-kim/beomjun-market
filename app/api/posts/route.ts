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
    body: { question, latitude, longitude },
    session: { user },
  } = req;

  if (req.method === "POST") {
    const post = await client.post.create({
      data: {
        question,
        latitude,
        longitude,
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
    // url이 ...?a=${a}&b=${b} req.query로 접근 가능
    const {
      query: { latitude, longitude },
    } = req;

    // parseFloat : 부동소수점 실수로 파싱해 반환
    const parsedLatitude =
      typeof latitude === "string" ? parseFloat(latitude.toString()) : NaN;
    const parsedLongitude =
      typeof longitude === "string" ? parseFloat(longitude.toString()) : NaN;

    // if (String(parsedLatitude) || String(parsedLongitude)) {
    //   res.json({ ok: false, error: "잘못된 위도 또는 경도" });
    //   return;
    // }

    const posts = await client.post.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            wondering: true,
            answers: true,
          },
        },
      },
      where: {
        latitude: {
          // gte : 크거나 같다
          // lte : 작거나 같다
          gte: parsedLatitude - 0.01,
          lte: parsedLatitude + 0.01,
        },
        longitude: {
          gte: parsedLongitude - 0.01,
          lte: parsedLongitude + 0.01,
        },
      },
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
