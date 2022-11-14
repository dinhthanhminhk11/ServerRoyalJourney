import { Router } from 'express'
import {
  createOrder,
  ListOrder,
  orderNotices,
  orderNotSeem,
  updateStatus,
  updateStatusDone,
  listOrderByIdUser
} from '../controller/order/order'
const router = Router()
router.route('/addorder').post(createOrder)
router.route('/order').post(ListOrder).patch(updateStatus)
router.route('/listOrderByIdUser/:id').get(listOrderByIdUser)
router.route('/oderseem').post(orderNotSeem)
router.route('/orderdone').patch(updateStatusDone)
router.route('/ordernotices').post(orderNotices)
export default router
