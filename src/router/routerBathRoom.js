import { Router } from 'express'
import { getBathRoom, getListBathById } from '../controller/product/BathRooms'
const router = Router()

router.get('/bathrooms', getBathRoom)
router.post('/bathrooms', getListBathById)
export default router
