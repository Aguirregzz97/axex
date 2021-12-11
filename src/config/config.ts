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

const MONGO_USERNAME = process.env.MONGO_USERNAME || "username"
const MONGO_PASSWORD = process.env.MONGO_PASSWORD || "supersecretpassword"
const MONGO_URL = process.env.MONGO_URL || ""

const MONGO = {
  host: MONGO_URL,
  username: MONGO_USERNAME,
  password: MONGO_PASSWORD,
  options: MONGO_OPTIONS,
  url: `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_URL}`,
}

const UPLOAD_CARE_PUBLIC_KEY = process.env.UPLOAD_CARE_PUBLIC_KEY || "key"

const UPLOAD_CARE = {
  publicKey: UPLOAD_CARE_PUBLIC_KEY,
}

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost"
const SERVER_PORT = process.env.SERVER_PORT || 1337

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
}

const config = {
  mongo: MONGO,
  server: SERVER,
  uploadCare: UPLOAD_CARE,
}

export default config
