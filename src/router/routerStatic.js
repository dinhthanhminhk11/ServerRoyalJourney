import { Router } from 'express'
import {
    getTimeOrder,
    totalOrder,
    totalOrderFail,
    totalOrderFinish,
    totalOrderProcess
} from "../controller/static/staticDao";
const router = Router()

router.get('/totalOrder/:IdHost', totalOrder)
router.get('/totalOrderFinish/:IdHost', totalOrderFinish)
router.get('/totalOrderProcess/:IdHost', totalOrderProcess)
router.get('/totalOrderFail/:IdHost', totalOrderFail)
router.get('/getTimeOrder/:IdHost', getTimeOrder)
export default router
