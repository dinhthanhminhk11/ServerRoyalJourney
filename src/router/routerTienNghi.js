import { Router } from 'express'
import {addTienNghiKs, getAllTienNghiKS, getListTienNghiKsById} from "../controller/supplement/tienNghiKsDao";
import {
    addTienNghiPhong,
    getAllTienNghiPhong,
    getListTienNghiPhongById
} from "../controller/supplement/tienNghiPhongDao";

const router = Router()
router.post('/addTienNghiKs',addTienNghiKs)
router.post('/addTienNghiPhong',addTienNghiPhong)
router.get('/getAllTienNghiKs',getAllTienNghiKS)
router.get('/getAllTienNghiPhong',getAllTienNghiPhong)

router.route('/getTienNghiKs').post(getListTienNghiKsById)
router.route('/getTienNghiPhong').post(getListTienNghiPhongById)
export default router
