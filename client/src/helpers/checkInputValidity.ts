import { CalculatorInput } from '../store/calculator/initialState'

export default (input: CalculatorInput): boolean =>
  !Object.values(input).includes('')
