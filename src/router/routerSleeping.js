import { Router } from 'express'
import {
  getSleepingPlaces,
  sleepingPlaces,
} from '../controller/sleeping/findSleeping'
import {addBedroom, getBedRoom, getBedRoomById} from "../controller/sleeping/findBedRoom";
const router = Router()
router.route('/sleeping').get(getSleepingPlaces)
router.route('/sleepingplaces').post(sleepingPlaces)

router.route('/bedroom').get(getBedRoom)
router.route('/bedroomById').post(getBedRoomById)
router.post("/addBedroom",addBedroom)
export default router
