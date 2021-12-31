import http from "http"
import express from "express"
import next from "next"
import bodyParser from "body-parser"
import mongoose from "mongoose"
import logging from "./config/logging"
import config from "./config/config"
import userRoutes from "./routes/user"
import incidentRoutes from "./routes/incident"
import complaintRoutes from "./routes/complaint"
import annoucementRoutes from "./routes/announcement"
import residencyRoutes from "./routes/residency"
import paymentRequestRoutes from "./routes/paymentRequest"
import paymentRoutes from "./routes/payment"
import visitRoutes from "./routes/visit"
import unitRoutes from "./routes/unit"
import arrivalRoutes from "./routes/arrival"
import dataInitRoutes from "./routes/dataInit"
import auth from "./middleware/auth"
import checkForExpiredPaymentRequests from "./jobs/checkExpiredPaymentRequest"
import generateMonthlyPaymentRequests from "./jobs/generateMonthlyPaymentRequests"

const nextApp = next({ dev: config.server.nodeEnv !== "production" })
const nextHandler = nextApp.getRequestHandler()

// Create the router
const router = express()

// Create the server
const httpServer = http.createServer(router)

const NAMESPACE = "Server"

// Connect to Mongo
mongoose
  .connect(config.mongo.url, config.mongo.options)
  .then(() => {
    logging.info(NAMESPACE, "Connected to mongoDB!")
    httpServer.listen(config.server.port, () => {
      return logging.info(
        NAMESPACE,
        `Server running on ${config.server.apiUrl}`,
      )
    })
  })
  .catch((error) => {
    logging.error(NAMESPACE, error.message, error)
  })

// Log Request
router.use((req, res, nextMethod) => {
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

  nextMethod()
})

// create middleware application/json parser
const jsonParser = bodyParser.json()

// Rules of API
router.use((req, res, nextMethod) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization",
  )

  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "GET PATCH DELETE POST PUT")
    return res.status(200).json({})
  }
  nextMethod()
})

// Routes
router.use("/api/data-init", jsonParser, dataInitRoutes)
router.use("/api/user", jsonParser, userRoutes)
router.use("/api/incident", auth, jsonParser, incidentRoutes)
router.use("/api/complaint", auth, jsonParser, complaintRoutes)
router.use("/api/announcement", auth, jsonParser, annoucementRoutes)
router.use("/api/residency", jsonParser, residencyRoutes)
router.use("/api/payment-request", auth, jsonParser, paymentRequestRoutes)
router.use("/api/payment", auth, jsonParser, paymentRoutes)
router.use("/api/visit", auth, visitRoutes)
router.use("/api/arrival", jsonParser, arrivalRoutes)
router.use("/api/unit", auth, jsonParser, unitRoutes)

// Jobs
if (config.server.nodeEnv === "production") {
  checkForExpiredPaymentRequests()
  generateMonthlyPaymentRequests()
}

if (config.server.nodeEnv !== "test") {
  nextApp.prepare().then(() => {
    logging.info(NAMESPACE, "Next App Prepared!")

    // Add routing for next
    router.use("/", (req, res) => {
      return nextHandler(req, res)
    })

    // Error Handling
    router.use((req, res) => {
      const error = new Error("not found")

      return res.status(404).json({
        message: error.message,
      })
    })
  })
}

export default { router, httpServer, nextApp }
