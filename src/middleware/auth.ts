import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { NextFunction, Response } from "express"

dotenv.config()

const authenticateToken = (req: any, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(" ")[1]
  if (!token) {
    return res.status(401).json({
      message: "A token is required for authentication",
    })
  }
  jwt.verify(
    token,
    process.env.ACCESS_TOKEN_SECRET || "",
    (err: any, result: any) => {
      if (err) {
        return res.status(403).json({
          message: "Invalid Json Web Token",
        })
      }
      req.user = result.user
      next()
    },
  )
}

export default authenticateToken
