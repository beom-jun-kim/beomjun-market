import { NextRequest, NextResponse } from "next/server";
import withHandler from "@/app/libs/server/withHandler";
import client from "@/app/libs/server/client";

export const POST = async (req: NextRequest) => {
  const { email, phone } = await req.json();
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

  return NextResponse.json(user,{status:200});
};

export default withHandler("POST", POST);