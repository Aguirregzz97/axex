import { UploadClient } from "@uploadcare/upload-client"
import config from "../config/config"

const uploadCareClient = new UploadClient({
  publicKey: config.uploadCare.publicKey,
})

export default uploadCareClient
