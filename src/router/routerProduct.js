import { Router } from 'express'
import { addProduct } from '../controller/product/addProduct'
import { deleteProduct } from '../controller/product/deleteProduct'
import { getProduct, getProducts } from '../controller/product/findProduct'

const router = Router()
router.route('/listProduct').get(getProducts)
router.get('/listProduct/:id', getProduct)
router.post('/addProduct', addProduct)
router.delete('/deleteProduct/:id', deleteProduct)

export default router
