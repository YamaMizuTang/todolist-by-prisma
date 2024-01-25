import { PrismaClient } from "@prisma/client";
import { Controller, Delete, Get, Path, Post, Query, Route } from "tsoa";

const prisma = new PrismaClient();

@Route("/")
export class ListController extends Controller {
  @Get("add")
  public async add(@Query() name?: string) {
    const newEvent = typeof name === "string" ? name : ""; //check type
    try {
      await add(newEvent);
    } catch (err) {
      console.error(err);
    }

    return `${newEvent} Add Sucess`;
  }

  @Delete("/:id")
  public async delete(@Path() id: number) {
    await prisma.item.update({
      where: {
        id: id,
      },
      data: {
        deleted: true,
      },
    });

    return `id:${id} Delete Sucess`;
  }

  @Post("list")
  public async list() {
    let list: ListArray = [];
    try {
      list = await retrieve(); //return retrieve return 的 Promise resolve之後的值
    } catch (err) {
      console.error(err);
    }

    return list;
  }
}

//Prisma 新增資料到資料庫
async function add(data: string) {
  const item = await prisma.item.create({
    data: {
      name: data,
    },
  });
}
//Prisma 從資料庫取得所有資料
async function retrieve() {
  const items = await prisma.item.findMany();
  return items;
}

type ListArray = Item[];
interface Item {
  name: String | null;
  deleted: Boolean | null;
  id: number | null;
  createTime?: Date | null;
  updateTime?: Date | null;
}
