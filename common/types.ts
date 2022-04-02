import { Operations } from './enums'

export interface CalcReqBody {
  number1: number,
  number2: number,
  action: Operations
}

export interface CalcErrorResponse {
  message: string
}

export interface CalcSuccessfulResponse {
  result: number
}

export type CalcResBody = CalcErrorResponse | CalcSuccessfulResponse
