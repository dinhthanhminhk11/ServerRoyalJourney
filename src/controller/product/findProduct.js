import product from '../../models/product'

export const getProduct = async (req, res) => {
  const filter = { _id: req.params.id }
  try {
    const data = await product
      .findById(filter)
      .populate('user')
      .populate({ path: 'category', model: 'Category', select: 'name' })
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
export const getProducts = async (req, res) => {
  try {
    const data = await product.find()
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
