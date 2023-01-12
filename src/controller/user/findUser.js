import user from "../../models/user";
import Hotel from "../../models/Hotel";

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
