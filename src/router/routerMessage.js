import {Router} from 'express'
import { addMessage, findMessage,findMessageUser, findUser, findMessageId, findHost, statusMessage } from '../controller/message/messageDao'


const router = Router()

router.post("/addmsg/",addMessage)
router.get("/getmsg",findMessage)
router.get("/getmsg/:send&:sendTo",findMessageUser)
router.get("/getUser/",findUser)
router.get("/getMessage/:send",findMessageId)
router.get("/getHost/:id",findHost)
router.post("/statusMessage",statusMessage)

export default router