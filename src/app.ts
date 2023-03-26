import "dotenv/config";
import express from "express";
import cors from "cors";
import { router } from "./routes";
import path from "path";
import db from "./config/mongo";

const PORT = process.env.PORT;

const app = express();
app.use(cors());
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(express.static(path.join(__dirname, "public")))
app.use(router);
db().then(() => console.log(`Database connected`))

app.listen(PORT, () => console.log(`App on port ${PORT}`));
