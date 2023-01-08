import hotel from '../../models/Hotel'
import product from "../../models/product";

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
                    query: { checkConfirm : true},
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

