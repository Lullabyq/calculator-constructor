import Router from 'express'

import CalculatorController from './controllers/calculator.controller'
import { PageNotFoundError } from './errors/error'

const router = Router()

router.post('/api/calculate', CalculatorController.calculate)

router.route('*')
  .all(() => {
    throw new PageNotFoundError()
  })

export default router
