import { Router } from 'express'
import{createBookmark ,listProductById , deleteBookmark ,getBookmarkByIdUserAndIdHouse} from '../controller/bookmark/bookmark'
const router = Router()

router.post('/createBookmark' ,createBookmark )
router.get('/listBookmarkById/:id' ,listProductById )
router.delete('/deleteBookmark/:idUser/:idHotel' ,deleteBookmark )
router.get('/getBookmarkByIdUserAndIdHouse/:idUser/:idHotel' ,getBookmarkByIdUserAndIdHouse )
export default router;