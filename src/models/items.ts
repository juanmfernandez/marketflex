import { Schema, Types, Model, model } from "mongoose";
import { Product } from "../interfaces/product.interface";

const ItemSchema = new Schema<Product>(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    expDate: Date,
    price: {
      type: Number,
      required: true,
    },
    barCode: {
      type: Number,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const ItemModel = model("products", ItemSchema);

export default ItemModel;
