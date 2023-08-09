// import { NextApiRequest, NextApiResponse } from "next";

// export default function handler(req: NextApiRequest, res: NextApiResponse) {
//   if (req.method !== "POST") {
//     res.status(401).end();
//   }
//   console.log(req.body.email);
//   res.status(200).end();
// }

import { NextResponse, NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  try {
    const body = await req.json();
    console.log(body.email);
    
    return NextResponse.json({ message: "Operation successful" },{ status: 200 });
  } catch (error) {
    console.error(error);
    
    return NextResponse.json({ message: "Error occurred" },{ status: 500 });
  }
};





