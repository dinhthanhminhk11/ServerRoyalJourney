import { Router } from 'express'
import { loginUser, loginHost, loginAdmin , isModerator  , verifyToken} from '../controller/user/signIn'
import { createHost, createUser , verifyEmail , sendAgain , checkEmailForgot , validateUserPass , newPass , updateCheckTokenDevice , updateInfoUser,updatePassword} from '../controller/user/signUp'
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
router.route('/signup/verify/sendAgain').post(sendAgain)

router.route('/checkEmailForgot').post(checkEmailForgot)
router.route('/validateUserPass').post(validateUserPass)
router.route('/newPass').post(newPass)

router.route('/updateCheckTokenDevice').post(updateCheckTokenDevice)
router.route('/updateInfoUser').patch(updateInfoUser)

router.route('/updatePassword').patch(updatePassword)
export default router
