import {Router} from 'express'
import { addCategory } from '../controller/category/addCate'
import { deleteCategory } from '../controller/category/deleteCate'
import {findCategory, getCategory ,getNameCatogory} from '../controller/category/findCate'
import { updateCategory } from '../controller/category/updateCate'

const router = Router()

router.get('/listCategory',getCategory)
router.post('/addCategory',addCategory)
router.delete('/deleteCategory/:id',deleteCategory)
router.put('/updateCategory/:id',updateCategory)
router.get('/getNameCategory/:id',getNameCatogory)
router.get('/listCategory/:id',findCategory)
export default router