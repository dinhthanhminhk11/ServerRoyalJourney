import { Router } from 'express'
import {
    getCountAllTimeOrder, getCountPriceAdmin,
    getCountTimeOrder, getPriceAdminOrder, getPriceAdminWaiting,
    getPriceDayOrder, getPriceLastDayOrder,
    getPriceMonthOrder,
    getPriceOrder,
    getPriceOrderWaiting,
    getPriceWeekOrder,
    getPriceYearOrder, totalAllOrder, totalAllOrderFail, totalAllOrderFinish, totalAllOrderProcess,
    totalOrder,
    totalOrderFail,
    totalOrderFinish,
    totalOrderProcess
} from "../controller/static/staticDao";
const router = Router()

router.get('/totalOrder/:idHost', totalOrder)
router.get('/totalAllOrder', totalAllOrder)

router.get('/totalAllOrderFinish', totalAllOrderFinish)
router.get('/totalAllOrderProcess', totalAllOrderProcess)
router.get('/totalAllOrderFail', totalAllOrderFail)

router.get('/totalOrderFinish/:idHost', totalOrderFinish)
router.get('/totalOrderProcess/:idHost', totalOrderProcess)
router.get('/totalOrderFail/:idHost', totalOrderFail)
router.get('/getTimeOrder/:idHost', getCountTimeOrder)

router.get('/getAllTimeOrder', getCountAllTimeOrder)
router.get('/getPriceDayOrder/:idHost', getPriceDayOrder)
router.get('/getPriceDayLastOrder/:idHost', getPriceLastDayOrder)
router.get('/getPriceWeekOrder/:idHost', getPriceWeekOrder)
router.get('/getPriceMonthOrder/:idHost', getPriceMonthOrder)
router.get('/getPriceYearOrder/:idHost', getPriceYearOrder)
router.get('/getPriceWaiting/:idHost', getPriceOrderWaiting)
router.get('/getPriceOrder/:idHost&:startDay&:endDay', getPriceOrder)
router.get('/getPriceAdminOrder/:startDay&:endDay', getPriceAdminOrder)


router.get('/getTotalPriceAdmin', getCountPriceAdmin)
router.get('/getPriceAdminWaiting', getPriceAdminWaiting)
export default router
