import user from "../../models/user";
import Hotel from "../../models/Hotel";
import hotel from "../../models/Hotel";

export const getAllHostUser = async (req, res) => {
    try {
        const dataSuccess = []
        const data = await user.find({role: 1, name: {$ne: "admin"}})
        data.forEach(async (item) => {
            const dataHotel = await Hotel.find({idUser: item._id}).count()
            const result = {
                data: item,
                getCount: dataHotel
            }
            dataSuccess.push(result)
        })
        setTimeout(() => {
            res.status(200).json(dataSuccess)
        }, 800)
    } catch (error) {
        res.status(400).json({
            // error
            message: 'false',
        })
    }
}
export const getCountHotelByUser = async (req, res) => {
    try {
        const data = await Hotel.find({idUser: req.params.idUser}).count()
        res.status(200).json({
            data
        })
    } catch (error) {
        res.status(400).json({
            // error
            message: 'false',
        })
    }
}

export const getAllUser = async (req, res) => {
    try {
        const data = await user.find({role: 0})
        res.status(200).json(data)

    } catch (error) {
        res.status(400).json({
            message: 'false',
        })
    }
}

export const LockAccountUser = async (req, res) => {
    try {
        const dataUpdate = await user.updateOne({_id:req.params.id},
            {checkAccount:false, reason: req.params.reason})
        res.status(200).json({
            message : "true"
        })
    } catch (error) {
        res.status(400).json({
            messege: 'false',
            error,
        })
    }
}

export const UnLockAccountUser = async (req, res) => {
    try {
        const dataUpdate = await user.updateOne({_id:req.params.id},
            {checkAccount:true, reason: ""})
        res.status(200).json({
            message : "true"
        })
    } catch (error) {
        res.status(400).json({
            messege: 'false',
            error,
        })
    }
}




