import { PrismaClient } from "@prisma/client";
import express, { Request, Response } from "express";

const prisma = new PrismaClient();
let router = express.Router();

router.get("/add", async (req: Request, res: Response) => {
  const newEvent =
    typeof req.query.newEvent === "string" ? req.query.newEvent : ""; //check type
  try {
    await add(newEvent);
  } catch (err) {
    console.error(err);
  }

  res.send(`${newEvent} Add Sucess`);
  console.log(newEvent, "/add");
});

router.get("/delete", async (req: Request, res: Response) => {
  await prisma.item.update({
    where: {
      id: Number(req.query.id),
    },
    data: {
      deleted: true,
    },
  });
  res.send(`id:${req.query.id} Delete Sucess`);
  console.log("/delete");
});

router.get("/list", async (req: Request, res: Response) => {
  let list: ListArray = [];
  try {
    list = await retrieve(); //return retrieve return 的 Promise resolve之後的值
  } catch (err) {
    console.error(err);
  }

  res.json(list);
  console.log("/list");
});

router.get("/", (_req: Request, res: Response) => {
  res.send("Hello todolist");
});

//Prisma 新增資料到資料庫
async function add(data: string) {
  const item = await prisma.item.create({
    data: {
      name: data,
    },
  });
  console.log(item);
}

//Prisma 從資料庫取得所有資料
async function retrieve() {
  const items = await prisma.item.findMany();
  return items;
}

interface ListArray {
  [index: number]: Item;
}
interface Item {
  name: String | null;
  deleted: Boolean | null;
  id: number | null;
  createTime?: Date | null;
  updateTime?: Date | null;
}

export default router; //ES6 要有這行才能回應請求，為何
