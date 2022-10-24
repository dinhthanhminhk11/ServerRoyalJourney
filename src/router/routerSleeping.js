import { Router } from 'express'
import {
  getSleepingPlaces,
  sleepingPlaces,
} from '../controller/sleeping/findSleeping'
const router = Router()
router.route('/sleeping').get(getSleepingPlaces)
router.route('/sleepingplaces').post(sleepingPlaces)
export default router
