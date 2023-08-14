import { NextRequest, NextResponse} from "next/server";
import withHandler from "@/app/libs/server/withHandler";
// import client from "@/app/libs/server/client";

export const POST = async (req:NextRequest) => {
  try {

    // 클라이언트에서 파싱한 데이터를 다시 json형식으로 파싱
    const body = await req.json();
    console.log(body);

    // NextResponse.JSON()은 첫 번째 인자로 응답 본문을, 두 번째 인자로 옵션 객체
    return NextResponse.json({mes:"성공"},{ status: 200 });
  } catch (error) {
    console.error(error);

    return NextResponse.json({mes:"실패"},{ status: 500 });
  }
};

export default withHandler("POST", POST);

// import { NextApiRequest, NextApiResponse } from "next";
// import withHandler from "@/app/libs/server/withHandler";
// import client from "@/app/libs/server/client";

// async function handler(req: NextApiRequest, res: NextApiResponse) {
//   console.log(req.body);
//   return res.status(200).end();
// }

// export default withHandler("POST", handler);
