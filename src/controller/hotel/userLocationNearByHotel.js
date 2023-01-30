import hotel from '../../models/Hotel'
import room from "../../models/Phong"
export const nearByUserLocation = async (req, res) => {
    try {
        const data = await hotel.aggregate([
            {
                $geoNear: {
                    near: {
                        type: "Point", coordinates: [
                            parseFloat(req.body.longitude),
                            parseFloat(req.body.latitude),
                        ]
                    },
                    query: { checkConfirm: true },
                    maxDistance: parseInt(req.body.dist),
                    distanceField: 'calculated',
                    spherical: true,
                },
            },
        ])
        res.status(200).json({
            messege: 'true',
            data: data,
        })
    } catch (error) {
        res.status(400).json({
            messege: error,
        })
    }
}

export const moderatorBoard = (req, res) => {
    res.status(200).send("User Content.");
};


export const nearByUserLocationAndFilter = async (req, res) => {
    try {
        console.log(req.params.person + " person")
        console.log(req.params.children + " children")
        console.log(req.params.countRoom + " countRoom")
        console.log(req.body.longitude + " longitude")
        console.log(req.body.latitude + " latitude")
        console.log(req.body.treEm + " treEm")
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

        dataRoom.forEach(async (item) => {
            const data = await hotel.findOne({
                _id: item.idHotel,
            })
            if (data != null) {
                console.log(data._id + " id")
                dataCompile.push(data)
            }
        })

        setTimeout(async () => {
            const dataLast = []
            const data1 = Array.from(new Set(dataCompile.map(JSON.stringify))).map(JSON.parse);
            console.log(data1 + " size")

            const data = await hotel.aggregate([
                {
                    $geoNear: {
                        near: {
                            type: "Point", coordinates: [
                                parseFloat(req.body.longitude),
                                parseFloat(req.body.latitude),
                            ]
                        },
                        query: {
                            // _id: data1[1],
                            checkConfirm: true,
                            treEm: {
                                $gte: req.body.treEm
                            }
                        },
                        maxDistance: parseInt(req.body.dist),
                        distanceField: 'calculated',
                        spherical: true,
                    },
                },
            ])

            data1.forEach(element => {
                data.forEach(element1 => {
                    if (element._id == element1._id) {
                        dataLast.push(element1)
                    }
                });
            });



            res.status(200).json({
                messege: 'true',
                data: dataLast,
            })
        }, 1000)


    } catch (error) {
        console.log(error)
        res.status(400).json({
            messege: error,
        })
    }
}

export const nearByUserLocationAndFilterAndPriceAndStar = async (req, res) => {
    try {
        console.log(req.params.person + " person")
        console.log(req.params.children + " children")
        console.log(req.params.countRoom + " countRoom")
        console.log(req.body.longitude + " longitude")
        console.log(req.body.latitude + " latitude")
        console.log(req.body.treEm + " treEm")
        const dataCompile = []
        const dataRoom = await room.find({
            MaxNguoiLon: {
                $gte: parseInt(req.params.person)
            },
            MaxTreEm: {
                $gte: parseInt(req.params.children)
            },
            SoPhong: { $gte: req.params.countRoom },
            price: {
                $gte: Number(req.params.startPrice) + 1,
                $lt: Number(req.params.endPrice) + 1
            }
        })

        dataRoom.forEach(async (item) => {
            const data = await hotel.findOne({
                _id: item.idHotel,
            })
            if (data != null) {
                console.log(data._id + " id")
                dataCompile.push(data)
            }
        })

        setTimeout(async () => {
            const dataLast = []
            const data1 = Array.from(new Set(dataCompile.map(JSON.stringify))).map(JSON.parse);
            console.log(data1 + " size")

            const data = await hotel.aggregate([
                {
                    $geoNear: {
                        near: {
                            type: "Point", coordinates: [
                                parseFloat(req.body.longitude),
                                parseFloat(req.body.latitude),
                            ]
                        },
                        query: {
                            // _id: data1[1],
                            checkConfirm: true,
                            treEm: {
                                $gte: req.body.treEm
                            },
                            TbSao: {
                                $lte: Number(req.params.TbSao),
                                // $lt: 6
                            },
                        },
                        maxDistance: parseInt(req.body.dist),
                        distanceField: 'calculated',
                        spherical: true,
                    },
                },
            ])

            data1.forEach(element => {
                data.forEach(element1 => {
                    if (element._id == element1._id) {
                        dataLast.push(element1)
                    }
                });
            });



            res.status(200).json({
                messege: 'true',
                data: dataLast,
            })
        }, 1000)


    } catch (error) {
        console.log(error)
        res.status(400).json({
            messege: error,
        })
    }
}

