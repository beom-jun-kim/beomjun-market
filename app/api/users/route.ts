import { NextApiRequest, NextApiResponse } from "next";
import {
  withHandler,
  ResponseType,
  WithHandlerConfig,
} from "@/app/libs/server/withHandler";
import client from "@/app/libs/server/client";
import smtpTransport from "@/app/libs/server/email";

declare module "iron-session" {
  interface UserResponseData {
    json: {
      ok: boolean;
    };
    status: number;
  }
}

export async function POST(
  req: NextApiRequest,
  res: NextApiResponse<ResponseType>
) {
  const {
    body: { email, phone },
  } = req;

  const user = email ? { email } : phone ? { phone } : null;
  if (!user) return res.status(400).json({ ok: false });
  const payload =
    Math.floor(10000 + Math.random() * 90000) + ""; /* + "" : 문자열로 변환 */
  const token = await client.token.create({
    data: {
      payload,
      user: {
        connectOrCreate: {
          where: {
            ...user,
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
  return res.json({ ok: true, token });
}

const handerObjOptions: WithHandlerConfig = {
  methods: ["POST"],
  handler: POST,
  isPrivate: false,
};

export const handlerOption = withHandler(handerObjOptions);
