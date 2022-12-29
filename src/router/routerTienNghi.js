import { Router } from 'express'
import {addTienNghiKs, getAllTienNghiKS, getListTienNghiKsById} from "../controller/supplement/tienNghiKsDao";
import {addTienNghiPhong} from "../controller/supplement/tienNghiPhongDao";

const router = Router()
router.post('/addTienNghiKs',addTienNghiKs)
router.post('/addTienNghiPhong',addTienNghiPhong)
router.get('/getAllTienNghiKs',getAllTienNghiKS)

router.route('/getTienNghiKs').post(getListTienNghiKsById)
export default router
