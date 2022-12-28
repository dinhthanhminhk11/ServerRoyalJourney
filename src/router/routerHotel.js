import { Router } from 'express'
import {addHotel} from '../controller/hotel/addHotel'
import {getAllHotel, getHotelHost} from "../controller/hotel/findHotel";

const router = Router()
// router.route('/listProduct').get(getProducts)
// router.get('/listProduct/:id', getProduct)
// router.get('/getProductsHost/:user', getProductsHost)
router.post('/addHotel', addHotel)
router.get('/getAllHotel', getAllHotel)
router.get('/getHotelHost/:idUser',getHotelHost)
// router.delete('/deleteProduct/:id', deleteProduct)
// router.get('/updateSao/:id&:sao', updateSaoProduct)
// router.get('/listFilterProduct/:startPrice&:endPrice&:sao&:idCategory', filterProducts)
// router.get('/listSearchProduct/:nameLocation', searchProducts)
// router.post('/updateProduct', updateProduct)

export default router
