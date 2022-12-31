import { Router } from 'express'
import {addPhong, deletePhong} from "../controller/phong/addPhong";
import {getPhongById, getPhongByIdHotel} from "../controller/phong/findPhong";
import {updatePhong} from "../controller/phong/updatePhong";

const router = Router()
router.post('/addPhong', addPhong)
router.get('/getPhongByIdHotel/:idHotel',getPhongByIdHotel)
router.get('/getPhongById/:id',getPhongById)
router.delete('/deletePhong/:id', deletePhong)
router.post('/updatePhong',updatePhong)

export default router
