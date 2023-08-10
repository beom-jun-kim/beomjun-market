// import { NextResponse, NextRequest } from "next/server";
// import withHandler from "../../libs/server/withHandler";

// export const POST = async (req:NextRequest) => {
//   try {
//     const body = await req.json();
//     console.log(body);

//     // NextResponse.JSON()은 첫 번째 인자로 응답 본문을, 두 번째 인자로 옵션 객체
//     return NextResponse.json({ status: 200 });
//   } catch (error) {
//     console.error(error);

//     return NextResponse.json({ status: 500 });
//   }
// };

// export default withHandler("POST", POST);

import { NextApiRequest, NextApiResponse } from "next";
import client from "@/app/libs/server/client";
import withHandler from "@/app/libs/server/withHandler";

async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log(req.body);
  return res.status(200).end();
}

export default withHandler("POST", handler);
