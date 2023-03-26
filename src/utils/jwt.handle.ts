import { sign, verify } from "jsonwebtoken";
const SECRET:string = process.env.SECRET || "S3CrEt";

const generateToken = (id: string) => {
  const token = sign({ id }, SECRET, {
    expiresIn: "6h",
  });
  return token;
};

const verifyToken = (token:string) => {
    return verify(token, SECRET);
};

export { generateToken, verifyToken };
