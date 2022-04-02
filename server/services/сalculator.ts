import { Operations } from '../../common/enums'
import { MAX_DECIMAL_PLACES } from '../constants'
import type { CalcStrategy } from '../ts/types'


abstract class CalcTemplate implements CalcStrategy {
  makeCalculation(a: number, b:number): number {
    const res = this.getResult(a, b)

    return this.round(res)
  }

  abstract getResult(a: number, b: number): number

  round(res: number): number {
    const decimalPrecision = Math.pow(10, MAX_DECIMAL_PLACES)

    return Math.round(res * decimalPrecision) / decimalPrecision
  }
}

class AddStrategy extends CalcTemplate implements CalcStrategy {
  getResult(a: number, b: number): number {
    return a + b
  }
}

class SubstructStrategy extends CalcTemplate {
  getResult(a: number, b: number): number {
    return a - b
  }
}

class MultiplyStrategy extends CalcTemplate {
  getResult(a: number, b: number): number {
    return a * b
  }
}

class DivideStrategy extends CalcTemplate {
  getResult(a: number, b: number): number {
    return a / b
  }
}

class Context {
  strategy: CalcStrategy

  setStrategy(strategy: CalcStrategy) {
    this.strategy = strategy
  }

  executeStrategy(a: number, b: number): number {
    return this.strategy.makeCalculation(a, b)
  }
}

class Calculator {
    context = new Context()

  calculate(a: number, b: number, action: Operations) {
    switch(action) {
      case Operations.Addition:
        this.context.setStrategy(new AddStrategy)
        break
      case Operations.Substraction:
        this.context.setStrategy(new SubstructStrategy)
        break
      case Operations.Multiplication:
        this.context.setStrategy(new MultiplyStrategy)
        break
      case Operations.Division:
        this.context.setStrategy(new DivideStrategy)
        break
    }

    return this.context.executeStrategy(a, b)
  }
}

export default new Calculator()
