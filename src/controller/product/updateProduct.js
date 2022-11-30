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
      name: req.put.name,
      images: req.put.images,
      price: req.put.price,
      supplement: req.put.supplement,
      nameLocation: req.put.nameLocation,
      location: {
        type: 'Point',
        coordinates: [
          parseFloat(req.put.longitude),
          parseFloat(req.put.latitude),
        ],
      },
      category: req.put.category,
      opening: req.put.opening,
      ending: req.put.ending,
      user: req.put.user,
      legal: req.put.legal,
      content: req.put.content,
      yte: req.put.yte,
      bathrooms: req.put.bathroom,
      limitPerson: req.put.limitPerson,
      sleepingPlaces: req.put.sleepingPlaces,
      startDate:  req.put.startDate,
      endDate:  req.put.endDate,
      isStillEmpty: false,
      cancellatioDate: req.put.cancellatioDate
    }
    const dataUpdate = await product.updateMany({_id:req.put._id},
        dataSave)
    res.status(200).json({
      data: dataUpdate
    })
  } catch (error) {
    res.status(400).json({
      messege: 'false',
      error
    })
  }
}

