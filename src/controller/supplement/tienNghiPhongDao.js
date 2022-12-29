import tiennghiphong from '../../models/tiennghiPhong'
export const addTienNghiPhong = async (req, res) => {
  try {
    const data = {
      name: req.body.name,
      iconImage: req.body.iconImage
    }
    const saveTienNghi = await new tiennghiphong(data).save()
    res.status(200).json({
      message: 'true',
    })
  } catch (error) {
    res.status(400).json({
      message: 'false',
    })
  }
}
// export const getListSupplementById = async (req, res) => {
//   try {
//     const data = await tiennghiks.findOne({ _id: req.body.id }).exec()
//     res.status(200).json({
//       message: 'true',
//       dataSupplements: data,
//     })
//   } catch (error) {
//     res.status(400).json({
//       // error
//       message: 'false',
//     })
//   }
// }
