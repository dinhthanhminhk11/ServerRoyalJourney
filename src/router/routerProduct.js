import { Router } from 'express'
import { addProduct } from '../controller/product/addProduct'
import { deleteProduct } from '../controller/product/deleteProduct'
import {
    filterProducts,
    getProduct,
    getProducts,
    getProductsHost,
    searchProducts
} from '../controller/product/findProduct'
import {updateProduct, updateSaoProduct} from "../controller/product/updateProduct";

const router = Router()
router.route('/listProduct').get(getProducts)
router.get('/listProduct/:id', getProduct)
router.get('/getProductsHost/:user', getProductsHost)
router.post('/addProduct', addProduct)
router.delete('/deleteProduct/:id', deleteProduct)
router.get('/updateSao/:id&:sao', updateSaoProduct)
router.get('/listFilterProduct/:startPrice&:endPrice&:sao&:idCategory', filterProducts)
router.get('/listSearchProduct/:nameLocation', searchProducts)
router.post('/updateProduct', updateProduct)

export default router
