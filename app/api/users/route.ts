import { NextApiRequest, NextApiResponse } from "next";
import { withHandler, ResponseType } from "@/app/libs/server/withHandler";
import client from "@/app/libs/server/client";
import smtpTransport from "@/app/libs/server/email";

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, phone } = await req.body;
  console.log("email", email);
  console.log("phone", phone);

  const user = phone ? { phone: +phone } : { email };
  const payload =
    Math.floor(10000 + Math.random() * 90000) + ""; /* + "" : 문자열로 변환 */
  const token = await client.token.create({
    // data: ctrl +클릭 , 값에 user가 꼭 필요하다고 나온다(TokenCreateInput)
    data: {
      payload,

      // token 생성시 user와 연결
      user: {
        // connectOrCreate : user가 있을 경우 token연결. 없으면 생성 후 연결
        connectOrCreate: {
          where: { ...user },

          // 데이터가 존재하지 않으면 생성
          create: {
            name: "beomjun",
            ...user,
          },
        },
      },
    },
  }); /* => user를 upsert하고 token생성 후 upsert했던 user와 token연결 */

  if (email) {
    const mailOptions = {
      from: process.env.MAIL_ID,
      to: email,
      subject: "beomjun-market Authentication Email",
      text: `Authentication Code : ${payload}`,
    };
    const result = await smtpTransport.sendMail(
      mailOptions,
      (error, responses) => {
        if (error) {
          console.log(error);
          return null;
        } else {
          console.log(responses);
          return null;
        }
      }
    );
    smtpTransport.close();
    console.log(result);
  }

  // token을 추가하면 client가 새로 생성됨 => 서버 재시작

  console.log(token);

  // NextResponse.json는 첫번째 인자로 응답 데이터 객체를 받아 객체 형식으로 전달
  return res.status(200).json({ ok: true });
}

export { withHandler };
