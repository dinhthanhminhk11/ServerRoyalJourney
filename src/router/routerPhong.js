import { Router } from 'express'
import {addPhong} from "../controller/phong/addPhong";
import {getPhongById} from "../controller/phong/findPhong";

const router = Router()
router.post('/addPhong', addPhong)
router.get('/getPhongById/:idHotel',getPhongById)

export default router
