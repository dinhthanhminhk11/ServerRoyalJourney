import { Router } from 'express'
import{createBookmark ,listProductById , deleteBookmark ,getBookmarkByIdUserAndIdHouse} from '../controller/bookmark/bookmark'
const router = Router()

router.post('/createBookmark' ,createBookmark )
router.get('/listBookmarkById/:id' ,listProductById )
router.delete('/deleteBookmark/:idUser/:idHouse' ,deleteBookmark )
router.get('/getBookmarkByIdUserAndIdHouse/:idUser/:idHouse' ,getBookmarkByIdUserAndIdHouse )
export default router;