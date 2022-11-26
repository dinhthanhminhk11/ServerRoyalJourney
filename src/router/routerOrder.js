import { Router } from 'express'
import {
  createOrder,
  ListOrder,
  orderNotices,
  orderNotSeem,
  updateStatus,
  updateStatusDone,
  listOrderByIdUser,
  getOrderById,
  updateOrderById,
  updateStatusAccessCancel,
  ordercancel,
  updateOrderByIdNotSeem,
  deleteOrderById,
  sendNotification,
  senNotificationAccess,
  senNotificationCancel,
  senNotificationRequestCancel,
  senMailnAccess,
  checkedOutRoom
} from '../controller/order/order'
const router = Router()
router.route('/addorder').post(createOrder)
router.route('/order').post(ListOrder).patch(updateStatus)
router.route('/listOrderByIdUser/:id').get(listOrderByIdUser)
router.route('/oderseem').post(orderNotSeem)
router.route('/orderdone').patch(updateStatusDone)
router.route('/ordernotices').post(orderNotices)
router.route('/order/:id').patch(updateStatus)
router.route('/ordercancel/:id').patch(ordercancel)
router.route('/updateOrderById').patch(updateOrderById)
router.route('/updateOrderByIdNotSeem').patch(updateOrderByIdNotSeem)
router.route('/getOrderById/:id').get(getOrderById)
router.route('/updateStatusAccessCancel/:id').patch(updateStatusAccessCancel)
router.route('/deleteOrderById/:id').delete(deleteOrderById)

router.route('/sendNotification').post(sendNotification)
router.route('/senNotificationAccess').post(senNotificationAccess)
router.route('/senNotificationCancel').post(senNotificationCancel)
router.route('/senNotificationRequestCancel').post(senNotificationRequestCancel)
router.route('/senMailnAccess').post(senMailnAccess)
router.route('/checkedOutRoom').post(checkedOutRoom)
export default router
