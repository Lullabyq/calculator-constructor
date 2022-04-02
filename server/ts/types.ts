import { Operations } from "../../common/enums";

export interface RestApiError {
  statusCode: number,
  message: string,
}

export interface Payload {
  number1: number,
  number2: number,
  action: Operations
}
