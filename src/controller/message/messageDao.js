import Message from "../../models/Message"
import user from "../../models/user";

export const addMessage = async (req,res) => {
    try {
        const { from, to, message } = req.body;
        const time=new Date(Date.now()).getHours() +":"+new Date(Date.now()).getMinutes()
        const data = await Message.create({
            message: { text: message },
            user: [from, to],
            send: from,
            time_send:time,
            sendTo:to,
            status:false
        });
        if (data) return res.json({ msg: "Message added successfully.",data});
        else return res.json({ msg: "Failed to add message to the database" });
    } catch (error) {
        res.status(400).json({
            error
        })
    }
};

export const findMessageUser = async (req,res)=>{
    try {
        const data = await Message.find({"send":{$in:[req.params.send,req.params.sendTo]}, "sendTo": {$in:[req.params.send,req.params.sendTo]}})
        res.json({
            data
        })
        console.log(req.params.id)
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}

export const findMessage = async (req,res)=>{
    try {
        // const data = await Message.find({"sendTo": req.params.id})
        const data = await Message.find()
        res.json({
            data
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}


export const findUser = async (req,res)=>{
    try {
        const data = await user.find()
        res.json({
            data
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}

export const statusMessage = (req,res)=>{
    req.body.forEach(async(element) => {
        await Message.findOneAndUpdate({_id:`${element._id}`},{$set:{status:true}},{new:true})
    });
    res.json(req.body)
}