import { IPaymentRequest } from "./paymentRequest"

export interface IPayment extends Document {
  paymentRequest: IPaymentRequest
}
