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
  checkedOutRoom,
  senNotificationRequestCheckOut,
  senMailCheckOutPost,
  sendMailComfirmCancelByUserPost,
  sendMailComfirmCancelByHostPost,
  checkMuiltuNoti,
  createNotiSuccess,
  createNotiAccessCancel,
  createNotiCancel,
  createNotiAccess,
  listNotificationByUser
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
router.route('/senMailCheckOut').post(senMailCheckOutPost)
router.route('/senNotificationRequestCheckOut').post(senNotificationRequestCheckOut)
router.route('/sendMailComfirmCancelByUserPost').post(sendMailComfirmCancelByUserPost)
router.route('/sendMailComfirmCancelByHostPost').post(sendMailComfirmCancelByHostPost)
router.route('/checkedOutRoom').post(checkedOutRoom)
router.route('/checkMuiltuNoti').post(checkMuiltuNoti)


router.route('/createNotiAccess').post(createNotiAccess)
router.route('/createNotiCancel').post(createNotiCancel)
router.route('/createNotiAccessCancel').post(createNotiAccessCancel)
router.route('/createNotiSuccess').post(createNotiSuccess)

router.route('/listNotificationByUser/:id').get(listNotificationByUser)


export default router
