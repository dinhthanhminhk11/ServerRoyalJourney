import tiennghiphong from '../../models/tiennghiPhong'
import tiennghiks from "../../models/tiennghiKs";
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
export const getAllTienNghiPhong = async (req, res) => {
  try {
    const data = await tiennghiphong.find()
    res.status(200).json({
      message: 'true',
      dataSupplements: data,
    })
  } catch (error) {
    res.status(400).json({
      message: 'false',
    })
  }
}
export const getListTienNghiPhongById = async (req, res) => {
  try {
    const data = await tiennghiphong.findOne({ _id: req.body.id }).exec()
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
