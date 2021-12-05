import { Request, Response } from "express"
import mongoose, { CallbackError } from "mongoose"
import bcrypyt from "bcrypt"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import User from "../models/user"
import IUser from "../interfaces/user"
import RefreshToken from "../models/refreshToken"

dotenv.config()

// helper functions

const generateAccessToken = (user: IUser) => {
  return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET || "", {
    expiresIn: "1d",
  })
}

const generateRefreshToken = (user: IUser) => {
  return jwt.sign({ user }, process.env.REFRESH_TOKEN_SECRET || "")
}

// Sign Up
const createUser = async (req: Request, res: Response) => {
  const { firstName, lastName, email, phone, password } = req.body

  const salt = await bcrypyt.genSalt()
  const hashedPassword = await bcrypyt.hash(password, salt)

  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    firstName,
    lastName,
    email,
    phone,
    password: hashedPassword,
  })

  return user
    .save()
    .then((result) => {
      return res.status(201).json({
        user: result,
      })
    })
    .catch((error) => {
      return res.status(500).json({
        message: error.messsage,
        error,
      })
    })
}

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body

  // Authenticate First
  const user = await User.findOne({ email }).exec()
  if (!user) {
    return res.status(400).json({
      message: "Email Not Found",
    })
  }
  if (await bcrypyt.compare(password, user.password)) {
    // Authorize User
    const accessToken = generateAccessToken(user)
    const refreshToken = generateRefreshToken(user)
    const RT = new RefreshToken({
      token: refreshToken,
    })
    return RT.save().then(() => {
      res.status(200).json({
        accessToken,
        refreshToken,
        user,
      })
    })
  }
  return res.status(400).json({
    message: "Password Incorrect",
  })
}

const generateToken = async (req: Request, res: Response) => {
  const { refreshToken } = req.body
  if (!refreshToken) {
    return res.status(401).json({
      message: "No refresh token provided",
    })
  }
  const rTokenMongo = await RefreshToken.findOne({ token: refreshToken }).exec()
  if (!rTokenMongo) {
    return res.status(403).json({
      message: "This refresh token does not exist in our cache",
    })
  }
  jwt.verify(
    refreshToken,
    process.env.REFRESH_TOKEN_SECRET || "",
    (err: any, userObj: any) => {
      if (err) {
        return res.status(403).json({
          message: "Refresh Token found but not valid",
        })
      }
      const accessToken = generateAccessToken(userObj.user)
      res.status(200).json({
        accessToken,
      })
    },
  )
}

const logout = (req: Request, res: Response) => {
  const RToken = req.body.refreshToken
  RefreshToken.deleteOne(
    { token: RToken },
    (err: CallbackError, deletedToken: any) => {
      if (err) {
        res.status(500).json({
          message: err.message,
          err,
        })
      }
      if (deletedToken.deletedCount === 0) {
        return res.status(401).json({
          message: "Refresh Token Not Found in cache",
        })
      }
      return res.status(204)
    },
  )
}

const getUsers = async (req: Request, res: Response) => {
  const users = await User.find({}).exec()
  return res.status(200).json({
    users,
  })
}

export default { createUser, loginUser, getUsers, generateToken, logout }
