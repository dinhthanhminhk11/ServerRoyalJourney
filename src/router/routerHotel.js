import { Router } from 'express'
import {addHotel} from '../controller/hotel/addHotel'
import {deleteHotelHost, getAllHotel, getHotelById, getHotelHost} from "../controller/hotel/findHotel";
import {updateHotel, updateSaoHotel} from "../controller/hotel/updateHotel";
import {nearByUserLocation} from "../controller/hotel/userLocationNearByHotel";

const router = Router()
// router.route('/listProduct').get(getProducts)
router.get('/getHotelById/:id', getHotelById)
// router.get('/getProductsHost/:user', getProductsHost)
router.post('/addHotel', addHotel)
router.get('/getAllHotel', getAllHotel)
router.get('/getHotelHost/:idUser',getHotelHost)
router.delete('/deleteHotel/:id', deleteHotelHost)
router.get('/updateSaoHotel/:id&:TbSao', updateSaoHotel)
// router.get('/listFilterProduct/:startPrice&:endPrice&:sao&:idCategory', filterProducts)
// router.get('/listSearchProduct/:nameLocation', searchProducts)
router.post('/hotelNearBy', nearByUserLocation)
router.post('/updateHotel', updateHotel)

export default router
