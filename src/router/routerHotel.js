import { Router } from 'express'
import {addHotel} from '../controller/hotel/addHotel'
import {
    deleteHotelHost,
    getAllHotel,
    getAllHotelConfirm,
    getHotelById,
    getHotelHost,
    getHotelAndRoomByIdRoom, getHotelByIdHost, getHotelByIdWeb,getFilterHotel,getFilterHotelAndStarAndPrice
} from "../controller/hotel/findHotel";
import {confirmHotel, updateHotel, updateSaoHotel} from "../controller/hotel/updateHotel";
import {nearByUserLocation , nearByUserLocationAndFilter ,nearByUserLocationAndFilterAndPriceAndStar} from "../controller/hotel/userLocationNearByHotel";

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
router.get('/getHotelAndRoomByIdRoom/:id/:idUser', getHotelAndRoomByIdRoom)

router.get('/confirmHotel/:id&:checkConfirm', confirmHotel)
router.get('/getFilterHotel/textLocation=:textLocation&ageChildren=:ageChildren&person=:person&children=:children&countRoom=:countRoom', getFilterHotel)



router.post('/nearByUserLocationAndFilter/ageChildren=:ageChildren&person=:person&children=:children&countRoom=:countRoom', nearByUserLocationAndFilter)

router.post('/nearByUserLocationAndFilterAndPriceAndStar/ageChildren=:ageChildren&person=:person&children=:children&countRoom=:countRoom&startPrice=:startPrice&endPrice=:endPrice&TbSao=:TbSao', nearByUserLocationAndFilterAndPriceAndStar)


router.get('/getFilterHotelAndStarAndPrice/textLocation=:textLocation&ageChildren=:ageChildren&person=:person&children=:children&countRoom=:countRoom&startPrice=:startPrice&endPrice=:endPrice&TbSao=:TbSao', getFilterHotelAndStarAndPrice)
export default router
