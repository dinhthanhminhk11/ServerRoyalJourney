import { Router } from 'express'
import {addHotel} from '../controller/hotel/addHotel'
import {
    deleteHotelHost,
    getAllHotel,
    getAllHotelConfirm,
    getHotelById,
    getHotelHost,
    getHotelAndRoomByIdRoom, getHotelByIdHost, getHotelByIdWeb
} from "../controller/hotel/findHotel";
import {confirmHotel, updateHotel, updateSaoHotel} from "../controller/hotel/updateHotel";
import {nearByUserLocation} from "../controller/hotel/userLocationNearByHotel";

const router = Router()
// router.route('/listProduct').get(getProducts)
router.get('/getHotelById/:id', getHotelById)
router.get('/getHotelByIdWeb/:id', getHotelByIdWeb)
// router.get('/getProductsHost/:user', getProductsHost)
router.post('/addHotel', addHotel)
router.get('/getAllHotel', getAllHotel)

router.get('/getAllHotelConfirm', getAllHotelConfirm)

router.get('/getHotelHost/:idUser',getHotelHost)
router.delete('/deleteHotel/:id', deleteHotelHost)
router.get('/updateSaoHotel/:id&:TbSao', updateSaoHotel)
// router.get('/listFilterProduct/:startPrice&:endPrice&:sao&:idCategory', filterProducts)
// router.get('/listSearchProduct/:nameLocation', searchProducts)
router.post('/hotelNearBy', nearByUserLocation)
router.post('/updateHotel', updateHotel)
router.get('/getHotelAndRoomByIdRoom/:id', getHotelAndRoomByIdRoom)

router.get('/confirmHotel/:id&:checkConfirm', confirmHotel)
export default router
