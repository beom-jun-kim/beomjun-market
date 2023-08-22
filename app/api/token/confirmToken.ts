import { NextRequest, NextResponse } from "next/server";
import withHandler, { ResponseType } from "@/app/libs/server/withHandler";
import client from "@/app/libs/server/client";

export const POST = async (req: NextRequest) => {
  const { token } = await req.json();
  console.log(token);
  return NextResponse.json({status:200});
};

export default withHandler("POST", POST);
