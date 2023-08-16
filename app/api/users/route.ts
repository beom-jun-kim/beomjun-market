import { NextApiRequest, NextApiResponse } from "next";
import withHandler from "@/app/libs/server/withHandler";
import client from "@/app/libs/server/client";

export const POST = async (req: NextApiRequest, res: NextApiResponse) => {
  const { email, phone } = req.body;
  let user;
  if (email) {
    user = await client.user.findUnique({
      where: {
        email,
      },
    });
    if (!user) {
      console.log("사용자를 찾지못했음!");
      user = await client.user.create({
        data: {
          name: "anonymous",
          email,
        },
      });
    }
    console.log("user", user);
  }

  return res.status(200).end();
};

export default withHandler("POST", POST);