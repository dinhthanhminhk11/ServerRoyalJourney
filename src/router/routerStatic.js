import { Router } from 'express'
import {
    getCountTimeOrder,
    getPriceDayOrder, getPriceLastDayOrder,
    getPriceMonthOrder,
    getPriceOrder,
    getPriceOrderWaiting,
    getPriceWeekOrder,
    getPriceYearOrder,
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
router.get('/getTimeOrder/:IdHost', getCountTimeOrder)
router.get('/getPriceDayOrder/:IdHost', getPriceDayOrder)
router.get('/getPriceDayLastOrder/:IdHost', getPriceLastDayOrder)
router.get('/getPriceWeekOrder/:IdHost', getPriceWeekOrder)
router.get('/getPriceMonthOrder/:IdHost', getPriceMonthOrder)
router.get('/getPriceYearOrder/:IdHost', getPriceYearOrder)
router.get('/getPriceWaiting/:IdHost', getPriceOrderWaiting)
router.get('/getPriceOrder/:IdHost&:startDay&:endDay', getPriceOrder)
export default router
