import { NextApiRequest, NextApiResponse } from "next";
import { withApiHandler, ApiResponseType } from "@/app/libs/server/withApiHandler";
import client from "@/app/libs/server/client";
import { withApiSession } from "@/app/libs/server/withSession";

export async function GET(
  req: NextApiRequest,
  res: NextApiResponse<ApiResponseType>
) {
    const profile = await client.user.findUnique({
      where: {
        id: req.session.user?.id,
      },
    });
    res.status(200).json({ ok: true, profile });
}

export const getProfileRoute = withApiSession(withApiHandler("GET",GET));
