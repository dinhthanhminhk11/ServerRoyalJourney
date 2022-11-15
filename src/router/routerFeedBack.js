import { Router } from 'express'
import {addFeedBack, listFeedBackId, updateFeedBack} from "../controller/feedback/feedbackDao";
const router = Router()

router.post('/createFeedBack',addFeedBack)
router.get('/listFeedBack/:idHouse',listFeedBackId)
router.get('/updateFeedBack/:id&:textHost',updateFeedBack)

export default router