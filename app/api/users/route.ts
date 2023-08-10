// import { NextApiRequest, NextApiResponse } from "next";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     res.status(401).end();
//   }
//   console.log(req.body.email);
//   res.status(200).end();
// }

import { NextResponse, NextRequest } from "next/server";

export const POST = async (req:NextRequest) => {
  try {
    const body = await req.json();
    console.log(body);
    
    // NextResponse.JSON()은 첫 번째 인자로 응답 본문을, 두 번째 인자로 옵션 객체
    return NextResponse.json({ status: 200 });
  } catch (error) {
    console.error(error);
    
    return NextResponse.json({ status: 500 });
  }
};