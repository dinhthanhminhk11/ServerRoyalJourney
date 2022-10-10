import { Router } from 'express'
import { loginUser, loginHost, loginAdmin } from '../controller/user/signin'
import { createHost, createUser } from '../controller/user/signup'
const router = Router()
router.route('/signup').post(createUser)
router.route('/signin').post(loginUser)
router.route('/host/signup').post(createHost)
router.route('/host/signin').post(loginHost)
router.route('/admin/signin').post(loginAdmin)
export default router
