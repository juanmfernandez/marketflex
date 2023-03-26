import { Request, Response, Router } from "express";
import { readdirSync } from "fs";

const PATH_ROUTER = `${__dirname}`;
const router = Router();

const cleanFileName = (fileName: string) => {
  const file = fileName.split(".").shift();
  return file;
};

readdirSync(PATH_ROUTER).filter((fileName) => {
  const cleanName = cleanFileName(fileName);
  if (cleanName !== "index") {
    import(`./${cleanName}`).then((moduleRouter) => {
      router.use(`/${cleanName}`, moduleRouter.router);
    });
  }
  router.get("/", (_req: Request, res: Response) =>
    res.status(200).json({
      message: "Welcome to MarketFlex",
      items: "[GET] /items",
      item: "[GET] /items/:id (You must find by barcode, not _id)",
      newItem: {
        route: "[POST] /items --multipart/form-data",
        params: {
            name: "string",
            brand: "string",
            description: "string",
            expDate: Date,
            price: "number",
            barCode: "number",
            photo: "1 photo",
        },
      },
      register: {
        route: "[POST] /auth/register --application/x-www-form-urlencoded or json",
        params: {
          name: "string",
          lastName: "string",
          email: "string",
          password: "string",
        },
      },
      login: {
        route: "[POST] /auth/login --application/x-www-form-urlencoded or json",
        params: {
          email: "string",
          password: "string",
        },
      },
    })
  );
});

export { router };
