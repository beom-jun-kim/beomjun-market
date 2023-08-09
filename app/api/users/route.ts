// import { NextResponse, NextRequest } from "next/server";
// import { NextApiRequest, NextApiResponse } from "next";

// export const POST = async (request: NextRequest) => {
//   const body = await request.json();
//   console.log({body});

//   // Do something

//   return NextResponse.json({ message: "Operation successful" },{ status: 200 });
// };

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





