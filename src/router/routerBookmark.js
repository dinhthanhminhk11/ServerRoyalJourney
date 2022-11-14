import { Router } from 'express'
import{createBookmark ,listProductById} from '../controller/bookmark/bookmark'
const router = Router()

router.post('/createBookmark' ,createBookmark )
router.get('/listBookmarkById/:id' ,listProductById )

export default router;