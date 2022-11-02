import {Router} from 'express'
import { addMessage, findMessage } from '../controller/message/messageDao'


const router = Router()

router.post("/addMessage/",addMessage)
router.get("/getMassage",findMessage)

export default router