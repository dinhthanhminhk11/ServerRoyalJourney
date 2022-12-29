import { Router } from 'express'
import{createCashFlow,listCashFlow} from '../controller/cashFolw/cashFolw'
const router = Router()

router.post('/createCashFlow' ,createCashFlow)
router.get('/listCashFlow/:id' ,listCashFlow )

export default router