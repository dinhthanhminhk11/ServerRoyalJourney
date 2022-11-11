import {Router} from 'express'
import { addMessage, findMessage,findMessageUser, findUser, statusMessage } from '../controller/message/messageDao'


const router = Router()

router.post("/addmsg/",addMessage)
router.get("/getmsg",findMessage)
router.get("/getmsg/:send&:sendTo",findMessageUser)
router.get("/getUser/",findUser)
router.post("/statusMessage",statusMessage)

export default router