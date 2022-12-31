import hotel from '../../models/Hotel'
import user from "../../models/user";

export const getHotelById = async (req, res) => {
    const filter = {_id: req.params.id}
    try {
        const data = await hotel
            .findById(filter)
        res.status(200).json(
            data
        )
    } catch (error) {
        res.status(400).json({
            // error
            message: error,
        })
    }
}
export const getAllHotel = async (req, res) => {
    try {
        const data = await hotel.find()
        res.status(200).json({
            message: 'true',
            datapros: data,
        })
    } catch (error) {
        res.status(400).json({
            // error
            message: 'false',
        })
    }
}
export const getHotelHost = async (req, res) => {
    try {
        const data = await hotel.find({idUser: req.params.idUser})
        res.status(200).json({
            message: 'true',
            datapros: data,
        })
    } catch (error) {
        res.status(400).json({
            // error
            message: 'false',
        })
    }
}
export const deleteHotelHost = async (req, res) => {
    try {
        const data = await hotel.deleteOne({_id: req.params.id})
        res.status(200).json({
            message: 'true',
        })
    } catch (error) {
        res.status(400).json({
            // error
            message: 'false',
        })
    }
}

// export const filterProducts = async (req, res) => {
//     try {
//         const idCategory = req.params.idCategory.split(',');
//         const data = await product.find({
//             price: {
//                 $gte: Number(req.params.startPrice) + 1,
//                 $lt: Number(req.params.endPrice) + 1
//             },
//             sao: {
//                 $gte: Number(req.params.sao),
//                 $lt: 6
//             },
//             category: Object(idCategory),
//         })
//         res.status(200).json({
//             message: 'true',
//             datapros: data,
//         })
//     } catch (error) {
//         res.status(400).json({
//             error
//         })
//     }
// }
// export const searchProducts = async (req, res) => {
//     try {
//         const data = await product.find({nameLocation: {$regex: new RegExp(req.params.nameLocation), $options: "i"}})
//         res.status(200).json({
//             message: 'true',
//             datapros: data,
//         })
//     } catch (error) {
//         res.status(400).json({
//             error
//         })
//     }
// }

