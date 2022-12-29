import { Router } from 'express'
import {addTienNghiKs, getAllTienNghiKS} from "../controller/supplement/tienNghiKsDao";
import {addTienNghiPhong} from "../controller/supplement/tienNghiPhongDao";

const router = Router()
router.post('/addTienNghiKs',addTienNghiKs)
router.post('/addTienNghiPhong',addTienNghiPhong)

router.get('/getAllTienNghiKs',getAllTienNghiKS)
export default router
