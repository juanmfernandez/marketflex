import { Product } from "../interfaces/product.interface";
import ItemModel from "../models/items";

const insertProduct = async (product: Product) => {
  const newProduct = await ItemModel.create(product);
  return newProduct;
};

const getProduct = async (barCode: String) => {
  const responseProduct = await ItemModel.findOne({ barCode });
  if (!responseProduct) {
    throw new Error(`Product ${barCode} not found`);
  }
  return responseProduct;
};

const getProducts = async () => {
  const responseProducts = await ItemModel.find({});
  return responseProducts;
};

const updateProduct = async (id: string, data: Product) => {
  const responseProducts = await ItemModel.findOneAndUpdate({ _id: id }, data, {
    new: true,
  });
  return responseProducts;
};

const deleteProduct = async (id: string) => {
  const responseProducts = await ItemModel.deleteOne({ _id: id });
  if (!responseProducts.deletedCount) {
    throw new Error(`Product ${id} not found`);
  }
  return responseProducts;
};

export { insertProduct, getProducts, getProduct, updateProduct, deleteProduct };
