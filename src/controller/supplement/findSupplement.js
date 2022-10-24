import supplements from '../../models/supplements'
export const getSupplements = async (req, res) => {
  try {
    const data = await supplements.find()
    res.status(200).json({
      message: 'true',
      dataSupplements: data,
    })
  } catch (error) {
    res.status(400).json({
      // error
      message: 'false',
    })
  }
}
export const getListSupplementById = async (req, res) => {
  try {
    const data = await supplements.findOne({ _id: req.body.id }).exec()
    res.status(200).json({
      message: 'true',
      dataSupplements: data,
    })
  } catch (error) {
    res.status(400).json({
      // error
      message: 'false',
    })
  }
}
