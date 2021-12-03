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

const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || "localhost"
const SERVER_PORT = process.env.SERVER_PORT || 1337

const SERVER = {
  hostname: SERVER_HOSTNAME,
  port: SERVER_PORT,
}

const REDIS_HOST = process.env.REDIS_HOST || "localhost"
const REDIS_PORT = process.env.REDIS_PORT || 6379
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || ""
const REDIS_URL =
  "redis://axex-username:Axex7890#@redis-17065.c232.us-east-1-2.ec2.cloud.redislabs.com:17065"

const REDIS = {
  host: REDIS_HOST,
  port: REDIS_PORT,
  password: REDIS_PASSWORD,
  URL: REDIS_URL,
}

const config = {
  mongo: MONGO,
  server: SERVER,
  redis: REDIS,
}

export default config
