import { Router } from 'express'
import {
  getListSupplementById,
  getSupplements,
} from '../controller/supplement/findSupplement'
const router = Router()
router.route('/suplements').get(getSupplements)
router.route('/getsupplements').post(getListSupplementById)
export default router
