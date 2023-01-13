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

router.get('/totalOrder/:idHost', totalOrder)
router.get('/totalOrderFinish/:idHost', totalOrderFinish)
router.get('/totalOrderProcess/:idHost', totalOrderProcess)
router.get('/totalOrderFail/:idHost', totalOrderFail)
router.get('/getTimeOrder/:idHost', getCountTimeOrder)
router.get('/getPriceDayOrder/:idHost', getPriceDayOrder)
router.get('/getPriceDayLastOrder/:idHost', getPriceLastDayOrder)
router.get('/getPriceWeekOrder/:idHost', getPriceWeekOrder)
router.get('/getPriceMonthOrder/:idHost', getPriceMonthOrder)
router.get('/getPriceYearOrder/:idHost', getPriceYearOrder)
router.get('/getPriceWaiting/:idHost', getPriceOrderWaiting)
router.get('/getPriceOrder/:idHost&:startDay&:endDay', getPriceOrder)

export default router
