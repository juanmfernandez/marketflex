import { Request, Response } from "express";
import { getErrorMessage, reportError } from "../utils/error.handle";
import { loginUser, createNewUser } from "../services/auth.service";

const register = async (req: Request, res: Response) => {
  try {
    const { body } = req;
    const responseUser = await createNewUser(body);
    res.status(200).json({ responseUser });
  } catch (error) {
    res.status(400).json(reportError({ message: getErrorMessage(error) }));
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const token = await loginUser({ email, password });
    res.status(200).json({ token });
  } catch (error) {
    res.status(400).json(reportError({ message: getErrorMessage(error) }));
  }
};

export { register, login };
