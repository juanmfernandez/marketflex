import { Auth } from "../interfaces/auth.interface";
import { User } from "../interfaces/user.interface";
import UsersModel from "../models/user";
import { encrypt, verifyPassword } from "../utils/bcrypt.handle";
import { generateToken } from "../utils/jwt.handle";

const createNewUser = async (authUser: User) => {
  const exist = await UsersModel.findOne({ email: authUser.email });
  if (exist) throw new Error(`${authUser.email} already exist in database.`);
  authUser.password = await encrypt(authUser.password);
  const registerNewUser = await UsersModel.create(authUser);
  return registerNewUser;
};

const loginUser = async (authData: Auth) => {
  const exist = await UsersModel.findOne({ email: authData.email });
  if (!exist) throw new Error(`Invalid data`);

  const passwordHash = exist.password;
  const isCorrect = await verifyPassword(authData.password, passwordHash)
  if (!isCorrect) throw new Error(`Invalid password`);
  const token = generateToken(exist.id)
  return token;
};

export { loginUser, createNewUser };
