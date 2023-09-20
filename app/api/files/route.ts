import { NextApiRequest, NextApiResponse } from "next";
import { withHandler, ResponseType } from "@/app/libs/server/withHandler";
import client from "@/app/libs/server/client";
import { withApiSession } from "@/app/libs/server/withSession";

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const response = await (
    await fetch(
      `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ID}/images/v1/direct_upload`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.CF_TOKEN}`,
        },
      }
    )
  ).json();

  return res.json({ ok: true, ...response.result });
}

export const getProfileRoute = withApiSession(
  withHandler({
    methods: ["GET"],
    handler: GET,
  })
);
