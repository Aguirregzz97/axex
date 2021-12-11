import http from "http"
import express from "express"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import logging from "./config/logging"
import config from "./config/config"
import userRoutes from "./routes/user"
import incidentRoutes from "./routes/incident"
import complaintRoutes from "./routes/complaint"
import annoucementRoutes from "./routes/announcement"
import residencyRoutes from "./routes/residency"
import paymentRoutes from "./routes/payment"
import visitRoutes from "./routes/visit"
import auth from "./middleware/auth"
import checkForExpiredPayments from "./jobs/payment"

const NAMESPACE = "Server"
const router = express()

// Connect to Mongo
mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then(() => {
    logging.info(NAMESPACE, "Connected to mongoDB!")
  })
  .catch((error) => {
    logging.error(NAMESPACE, error.message, error)
  })

// Log Request
router.use((req, res, next) => {
  logging.info(
    NAMESPACE,
    `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}]`,
  )

  res.on("finish", () => {
    logging.info(
      NAMESPACE,
      `METHOD - [${req.method}], URL - [${req.url}], IP - [${req.socket.remoteAddress}], STATUS [${res.statusCode}]`,
    )
  })

  next()
})

// create middleware application/json parser
const jsonParser = bodyParser.json()

// Rules of API
router.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  )

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST PUT")
    return res.status(200).json({})
  }
  next()
})

// Routes
router.use("/api/user", jsonParser, userRoutes)
router.use("/api/incident", auth, jsonParser, incidentRoutes)
router.use("/api/complaint", auth, jsonParser, complaintRoutes)
router.use("/api/announcement", auth, jsonParser, annoucementRoutes)
router.use("/api/residency", auth, jsonParser, residencyRoutes)
router.use("/api/payment", auth, jsonParser, paymentRoutes)
router.use("/api/visit", auth, visitRoutes)

// Jobs
checkForExpiredPayments.start()

// Error Handling
router.use((req, res) => {
  const error = new Error("not found")

  return res.status(404).json({
    message: error.message,
  })
})

// Create the server
const httpServer = http.createServer(router)
httpServer.listen(config.server.port, () => {
  return logging.info(
    NAMESPACE,
    `Server running on ${config.server.hostname}:${config.server.port}`,
  )
})
