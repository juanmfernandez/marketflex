import { Request, Response, NextFunction } from "express";
import { getErrorMessage, reportError } from "../utils/error.handle";
import { verifyToken } from "../utils/jwt.handle";

const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  try {
    const jwt = req.headers.authorization?.split(" ").pop();
    if(!verifyToken(`${jwt}`)){
        throw new Error("Invalid session.")
    }
    next();
  } catch (error) {
    res.status(403).json(reportError({ message: getErrorMessage(error) }));
  }
};

export { checkJwt };
