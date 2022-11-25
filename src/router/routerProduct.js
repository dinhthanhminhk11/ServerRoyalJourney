import { Router } from 'express'
import { addProduct } from '../controller/product/addProduct'
import { deleteProduct } from '../controller/product/deleteProduct'
import {filterProducts, getProduct, getProducts} from '../controller/product/findProduct'
import {updateSaoProduct} from "../controller/product/updateProduct";

const router = Router()
router.route('/listProduct').get(getProducts)
router.get('/listProduct/:id', getProduct)
router.post('/addProduct', addProduct)
router.delete('/deleteProduct/:id', deleteProduct)
router.get('/updateSao/:id&:sao', updateSaoProduct)
router.get('/listFilterProduct/:startPrice&:endPrice&:sao&:idCategory', filterProducts)

export default router
