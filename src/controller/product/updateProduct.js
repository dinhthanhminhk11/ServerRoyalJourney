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
