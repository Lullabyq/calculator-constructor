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

export interface CalcStrategy {
  makeCalculation(a: number, b: number): number;
  getResult(a: number, b: number): number;
  round(res: number): number;
}
