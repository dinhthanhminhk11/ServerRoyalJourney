import hotel from '../../models/Hotel'
import user from "../../models/user";
import room from "../../models/Phong"

export const getHotelById = async (req, res) => {
    const filter = { _id: req.params.id }
    try {
        const data = await hotel.findById(filter)
        const dataRoom = await room.find({ idHotel: data._id })
        const dataUser = await user.findById({ _id: data.idUser })
        res.status(200).json(
            {
                "dataHotel": data,
                "dataRoom": dataRoom,
                "dataUser": dataUser
            }
        )
    } catch (error) {
        res.status(400).json({
            // error
            message: error,
        })
    }
}

export const getHotelByIdWeb = async (req, res) => {
    const filter = { _id: req.params.id }
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

export const getAllHotelConfirm = async (req, res) => {
    try {
        const data = await hotel.find({ checkConfirm: true })
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
        const data = await hotel.find({ idUser: req.params.idUser })
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
        const data = await hotel.deleteOne({ _id: req.params.id })
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

export const getHotelAndRoomByIdRoom = async (req, res) => {
    var currentDate = new Date(new Date().getTime() + 48 * 60 * 60 * 1000);

    let dateTomoro = currentDate.getDate()

    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = currentDate.getMonth() + 1;
    let year = currentDate.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();
    const filterRoom = { _id: req.params.id }
    try {
        const dataRoom = await room.findById(filterRoom)
        const dataHotel = await hotel.findById({ _id: dataRoom.idHotel })
        const dataUser = await user.findById({ _id: req.params.idUser })
        var addressHotel = dataHotel.sonha + ", " + dataHotel.xa + ", " + dataHotel.huyen + ", " + dataHotel.tinh
        res.status(200).json(
            {
                "idHotel": dataHotel._id,
                "idHost": dataHotel.idUser,
                "nameHotel": dataHotel.name,
                "addressHotel": addressHotel,
                "startHotel": dataHotel.TbSao,
                "imageHotel": dataHotel.images[0],
                "policyHotel": dataHotel.chinhSachHuy,
                "ageChildren": dataHotel.treEm,
                "idRoom": dataRoom._id,
                "nameRoom": dataRoom.name,
                "bedroom": dataRoom.bedroom,
                "priceRoom": dataRoom.price,
                "countRoom": dataRoom.SoPhong,
                "maxPeople": dataRoom.MaxNguoiLon,
                "maxChildren": dataRoom.MaxTreEm,
                "dateCancel": dateTomoro + "/" + month + "/" + year,
                passCashFlow: dataUser.passCashFlow,
                priceCashFlow: dataUser.priceCashFlow
            }
        )
    } catch (error) {
        console.log(error)
        res.status(400).json({
            // error
            message: error,
        })
    }
}


export const getFilterHotel = async (req, res) => {
    try {
        const dataCompile = []
        const dataRoom = await room.find({
            MaxNguoiLon: {
                $gte: parseInt(req.params.person)
            },
            MaxTreEm: {
                $gte: parseInt(req.params.children)
            },
            SoPhong: { $gte: req.params.countRoom }
        })

        console.log(dataRoom)
        console.log(dataRoom.length + " size")

        console.log(req.params.ageChildren + " ageChildren")
        console.log(req.params.person + " person")
        console.log(req.params.children + " children")
        console.log(req.params.countRoom + " countRoom")
        dataRoom.forEach(async (item) => {
            var regexName = RegExp(".*" + req.params.textLocation + ".*");
            const data = await hotel.findOne({
                _id: item.idHotel,
                checkConfirm: true,
                tinh: regexName,
                treEm: {
                    $gte: req.params.ageChildren
                }
            })
            if (data != null) {
                console.log(data._id + " id")
                dataCompile.push(data)
            }
        })
        setTimeout(() => {
            const data = Array.from(new Set(dataCompile.map(JSON.stringify))).map(JSON.parse);
            res.status(200).json(data)
        }, 1000)

    } catch (error) {
        console.log(error)
        res.status(400).json({
            message: 'false',
        })
    }
}


