import { NextApiRequest, NextApiResponse } from "next";
import prisma from "../libs/client";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await prisma.user.create({
    data: {
      email: "kbj2934@naver.com",
      name: "kimbeomjun",
    },
  });

  res.json({
    ok: true,
  });
}

// 이 페이지 404
// Unhandled Runtime Error
// pscale studio error