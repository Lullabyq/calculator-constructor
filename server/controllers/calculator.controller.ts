import type { Request, Response } from 'express'

import { ServerError } from '../errors/error'
import Calculator from '../services/сalculator'
import type { Payload } from '../ts/types'

export default class CalculatorController {
  static calculate (req: Request, res: Response) {
    try {
      const { number1, number2, action }: Payload = req.body
      const result = Calculator.calculate(number1, number2, action)

      return res.status(200).json({ result })
    } catch (err) {
      throw new ServerError()
    }
  }
}
