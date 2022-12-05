import product from '../../models/product'
export const updateSaoProduct = async (req, res) => {
  try {
    const dataUpdate = await product.updateOne({_id:req.params.id},
        {sao: req.params.sao})
    res.status(200).json({
      data: dataUpdate
    })
  } catch (error) {
    res.status(400).json({
      messege: 'false',
      error,
    })
  }
}
export const updateProduct = async (req, res) => {
  try {
    const dataSave = {
      name: req.body.name,
      images: req.body.images,
      price: req.body.price,
      supplement: req.body.supplement,
      nameLocation: req.body.nameLocation,
      location: {
        type: 'Point',
        coordinates: [
          parseFloat(req.body.longitude),
          parseFloat(req.body.latitude),
        ],
      },
      category: req.body.category,
      opening: req.body.opening,
      ending: req.body.ending,
      user: req.body.user,
      legal: req.body.legal,
      content: req.body.content,
      yte: req.body.yte,
      bathrooms: req.body.bathroom,
      limitPerson: req.body.limitPerson,
      sleepingPlaces: req.body.sleepingPlaces,
      startDate:  req.body.startDate,
      endDate:  req.body.endDate,
      isStillEmpty: false,
      cancellatioDate: req.body.cancellatioDate,
    }
    const dataUpdate = await product.updateOne({_id:req.body._id}, dataSave)
    res.status(200).json({
      Message: true
    })
  } catch (error) {
    res.status(400).json({
      messege: 'false',
      error
    })
  }
}

