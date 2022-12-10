import { Router } from 'express'
import {
    addFeedBack, getUser,
    listFeedBackId, listFeedBackIdSearch,
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
router.get('/searchFeedBack/:idHouse&:tk',  listFeedBackIdSearch)
router.get('/getUser/:idUser', getUser)
export default router