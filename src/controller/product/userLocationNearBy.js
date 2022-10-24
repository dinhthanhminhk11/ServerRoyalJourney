import product from '../../models/product'
export const nearByUserLoca = async (req, res) => {
  try {
    const data = await product.aggregate([
      {
        $geoNear: {
          near: {
            type: 'Point',
            coordinates: [
              parseFloat(req.body.longitude),
              parseFloat(req.body.latitude),
            ],
          },
          key: 'location',
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
