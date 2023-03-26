import { Router } from "express";
import {
  deleteItem,
  getItem,
  getItems,
  postItem,
  updateItem,
} from "../controllers/items";
import { checkJwt } from "../middleware/session";
import { checkMultipart, handleUploadFirebase } from "../middleware/upload";

const router = Router();

router.get("/:id", getItem);

router.get("/", getItems);

router.post("/", checkJwt, checkMultipart, handleUploadFirebase, postItem);

router.put("/:id", checkJwt, updateItem);

router.delete("/:id", checkJwt, deleteItem);

export { router };
