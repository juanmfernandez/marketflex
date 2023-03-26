import { Request, Response } from "express";
import {
  deleteProduct,
  getProduct,
  getProducts,
  insertProduct,
  updateProduct,
} from "../services/item.service";
import { getErrorMessage, reportError } from "../utils/error.handle";

const getItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await getProduct(id);
    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json(reportError({ message: getErrorMessage(error) }));
  }
};

const getItems = async (req: Request, res: Response) => {
  try {
    const products = await getProducts();
    res.status(200).json({ products });
  } catch (error) {
    res.status(400).json(reportError({ message: getErrorMessage(error) }));
  }
};

const updateItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { body } = req;
    const productUpdated = await updateProduct(id, body);
    res.status(200).json({ productUpdated });
  } catch (error) {
    res.status(400).json(reportError({ message: getErrorMessage(error) }));
  }
};

const postItem = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const responseNewProduct = await insertProduct(body);
    res.status(200).json({ responseNewProduct });
  } catch (error) {
    res.status(400).json(reportError({ message: getErrorMessage(error) }));
  }
};

const deleteItem = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const product = await deleteProduct(id);
    res.status(200).json({ product });
  } catch (error) {
    res.status(400).json(reportError({ message: getErrorMessage(error) }));
  }
};

export { getItem, getItems, updateItem, postItem, deleteItem };
