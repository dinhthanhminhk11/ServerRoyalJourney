import { Router } from 'express'
import { loginUser, loginHost, loginAdmin } from '../controller/user/signIn'
import { createHost, createUser } from '../controller/user/signUp'
import { nearByUserLocation,nearByUserLocationAllCategory } from '../controller/product/userLocationNearBy'
const router = Router()
router.route('/signup').post(createUser)
router.route('/signin').post(loginUser)
router.route('/host/signup').post(createHost)
router.route('/host/signin').post(loginHost)
router.route('/admin/signin').post(loginAdmin)
router.route('/nearmylocation').get(nearByUserLocation)
router.route('/nearByUserLocationAllCategory').get(nearByUserLocationAllCategory)
export default router
