import hotel from '../../models/Hotel'
export const nearByUserLocation = async (req, res) => {
  try {
    const data = await hotel.aggregate([
      {
        $geoNear: {
          near: {
             longitude: parseFloat(req.body.longitude),
             latitude: parseFloat(req.body.latitude),
          },
          maxDistance: parseInt(req.body.dist),
          distanceField: 'calculated',
          spherical: true,
        },
      },
    ])
    res.status(200).json({
      messege: 'true',
      dataMaps: data.map((item) => {
        return {
          data: item,
          distance: Math.ceil(item.calculated / 1000),
        }
      }),
    })
  } catch (error) {
    res.status(400).json({
      messege: 'false',
    })
  }
}

export const moderatorBoard = (req, res) => {
  res.status(200).send("User Content.");
};

