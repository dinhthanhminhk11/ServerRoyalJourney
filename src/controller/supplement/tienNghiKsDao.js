import tiennghiks from '../../models/tiennghiKs'


export const addTienNghiKs = async (req, res) => {
    try {
        const data = {
            name: req.body.name,
            iconImage: req.body.iconImage
        }
        const saveTienNghi = await new tiennghiks(data).save()
        res.status(200).json({
            message: 'true',
        })
    } catch (error) {
        res.status(400).json({
            message: 'false',
        })
    }
}

export const getAllTienNghiKS = async (req, res) => {
    try {
        const data = await tiennghiks.find()
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
export const getListTienNghiKsById = async (req, res) => {
  try {
    const data = await tiennghiks.findOne({ _id: req.body.id }).exec()
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
