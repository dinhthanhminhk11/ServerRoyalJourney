import { Router } from 'express'
import {
    addFeedBack,
    listFeedBackId,
    listIdUser,
    updateFeedBack,
    updateFeedBackUser
} from "../controller/feedback/feedbackDao";
const router = Router()

router.post('/createFeedBack',addFeedBack)
router.get('/listFeedBack/:idHouse',listFeedBackId)
router.get('/updateFeedBack/:id&:textHost',updateFeedBack)
router.get('/listIdUserFeedBack/:idHouse', listIdUser)
router.post('/updateFeedBackUser', updateFeedBackUser)

export default router