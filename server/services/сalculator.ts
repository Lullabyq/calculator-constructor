import { Operations } from '../../common/enums'
import { MAX_DECIMAL_PLACES , ERROR_MESSAGE } from '../constants'
import type { CalcStrategy } from '../ts/types'



abstract class CalcTemplate implements CalcStrategy {
  makeCalculation(a: string, b: string): string {
    const [number1, number2 ] = this.convertToNumber([a, b])
    const res = this.getResult(number1, number2)
    const roundedResult = this.round(res)

    return this.formatResult(roundedResult)
  }

  abstract getResult(a: number, b: number): number

  round(res: number): number {
    const decimalPrecision = Math.pow(10, MAX_DECIMAL_PLACES)

    return Math.round(res * decimalPrecision) / decimalPrecision
  }

  convertToNumber(arr: string[]): number[] {
    return arr.map(el => {
      const [int, decimal] = el.split(',')

      if (!decimal) {
        return Number(int)
      }

      return Number(int) + Number(decimal) / Math.pow(10, decimal.length)
    })
  }

  formatResult(result: number): string {
    return String(result).replace('.', ',')
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
    if (b === 0) {
      throw new Error(ERROR_MESSAGE.INFINITY)
    }

    return a / b
  }
}

class Context {
  strategy: CalcStrategy

  setStrategy(strategy: CalcStrategy) {
    this.strategy = strategy
  }

  executeStrategy(a: string, b: string): string {
    return this.strategy.makeCalculation(a, b)
  }
}

class Calculator {
  context = new Context()

  calculate(a: string, b: string, action: Operations) {
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
