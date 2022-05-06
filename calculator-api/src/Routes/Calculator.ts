import app from 'express'
import { CalculatorController } from '../Controllers/Calculator'
const router = app.Router();

const calculatorController: CalculatorController = new CalculatorController();

router.get('/historic', calculatorController.getHistoric)

router.post('/', calculatorController.calculate)

export default router
