import { NextApiRequest, NextApiResponse } from "next";
// import prisma from "../../libs/client";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    res.status(401).end();
  }
  console.log(req.body.email);
  res.status(200).end();
}