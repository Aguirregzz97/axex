import dotenv from "dotenv"

dotenv.config()

const MONGO_OPTIONS = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
  wtimeoutMS: 2500,
  keepAlive: true,
  maxPoolSize: 50,
  autoIndex: false,
  retryWrites: false,
}

const { MONGO_URL, MONGO_TEST_URL, MONGO_DEV_URL, NODE_ENV } = process.env

const getMongoUrl = () => {
  switch (NODE_ENV) {
    case "production":
      return MONGO_URL
    case "development":
      return MONGO_DEV_URL
    case "test":
      return MONGO_TEST_URL
    default:
      return MONGO_DEV_URL
  }
}

const MONGO_USERNAME = process.env.MONGO_USERNAME || "username"
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "supersecretpassword"
const MONGO_URL_ENV = getMongoUrl() || ""

const MONGO = {
  host: MONGO_URL_ENV,
  username: MONGO_USERNAME,
  password: MONGO_PASSWORD,
  options: MONGO_OPTIONS,
  url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URL_ENV}`,
}

const UPLOAD_CARE_PUBLIC_KEY = process.env.UPLOAD_CARE_PUBLIC_KEY || "key"

const UPLOAD_CARE = {
  publicKey: UPLOAD_CARE_PUBLIC_KEY,
}

const API_URL = process.env.API_URL || "http://localhost:1337"
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost"
const SERVER_PORT = process.env.SERVER_PORT || 1337
const TEST_USER_EMAIL = process.env.TEST_USER_EMAIL || ""
const TEST_USER_PASSWORD = process.env.TEST_USER_PASSWORD || ""

const SERVER = {
  apiUrl: API_URL,
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
  nodeEnv: NODE_ENV,
  testUserEmail: TEST_USER_EMAIL,
  testUserPassword: TEST_USER_PASSWORD,
}

const config = {
  mongo: MONGO,
  server: SERVER,
  uploadCare: UPLOAD_CARE,
}

export default config
