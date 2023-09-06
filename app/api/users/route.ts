import { NextApiRequest, NextApiResponse } from "next";
import {
  withHandler,
  ResponseType,
  WithHandlerConfig,
} from "@/app/libs/server/withHandler";
import client from "@/app/libs/server/client";
import smtpTransport from "@/app/libs/server/email";

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const { email, phone } = await req.body;
  console.log("email", email, "phone", phone);

  const user = phone ? { phone } : email ? { email } : null;
  const payload =
    Math.floor(10000 + Math.random() * 90000) + ""; /* + "" : 문자열로 변환 */
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            email:"asdf@asdf",
          },
          create: {
            name: "beomjun",
            ...user,
          },
        },
      },
    },
  });

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
  }

  // token을 추가하면 client가 새로 생성됨 => 서버 재시작

  // NextResponse.json는 첫번째 인자로 응답 데이터 객체를 받아 객체 형식으로 전달
  return res.json({ token, ok: true, status: 200 });
}

const handerObjOptions: WithHandlerConfig = {
  methods: ["POST"],
  handler: POST,
  isPrivate: false,
};

export const handlerOption = withHandler(handerObjOptions);
