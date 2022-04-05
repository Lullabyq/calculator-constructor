import Router from 'express'
import path from 'path'

import CalculatorController from './controllers/calculator.controller'


const router = Router()

router.post('/api/calculate', CalculatorController.calculate)

export default router
