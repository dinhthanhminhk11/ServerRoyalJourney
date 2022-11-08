import { Router } from 'express'
import { loginUser, loginHost, loginAdmin , isModerator  , verifyToken} from '../controller/user/signIn'
import { createHost, createUser , verifyEmail } from '../controller/user/signUp'
import { nearByUserLocation,nearByUserLocationAllCategory , moderatorBoard  } from '../controller/product/userLocationNearBy'
const router = Router()
router.route('/signup').post(createUser)
router.route('/signin').post(loginUser)
router.route('/host/signup').post(createHost)
router.route('/host/signin').post(loginHost)
router.route('/admin/signin').post(loginAdmin)
router.route('/nearmylocation').post(nearByUserLocation)
router.route('/nearByUserLocationAllCategory').post(nearByUserLocationAllCategory)
router.route('/getUserByToken').get([verifyToken, isModerator],moderatorBoard)
router.route('/signup/verify').post(verifyEmail)
export default router
