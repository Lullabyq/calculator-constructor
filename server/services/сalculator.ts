import { Operations } from '../../common/enums'

interface CalcStrategy {
  getResult(a: number, b: number): number;
}

class AddStrategy implements CalcStrategy {
  getResult(a: number, b: number): number {
    return a + b
  }
}

class SubstructStrategy implements CalcStrategy {
  getResult(a: number, b: number): number {
    return a - b
  }
}

class MultiplyStrategy implements CalcStrategy {
  getResult(a: number, b: number): number {
    return a * b
  }
}

class DivideStrategy implements CalcStrategy {
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
    return this.strategy.getResult(a, b)
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
