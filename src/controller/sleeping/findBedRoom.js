import bedroom from '../../models/BedRoom'
import tiennghiphong from "../../models/tiennghiPhong";
export const getBedRoom = async (req, res) => {
  try {
    const data = await bedroom.find()
    res.status(200).json({
      message: 'true',
      dataSleeping: data,
    })
  } catch (error) {
    res.status(400).json({
      // error
      message: 'false',
    })
  }
}

export const getBedRoomById = async (req, res) => {
  try {
    const data = await bedroom.findOne({ _id: req.body.id }).exec()
    res.status(200).json({
      message: 'true',
      dataSleeping: data,
    })
  } catch (error) {
    res.status(400).json({
      // error
      message: 'false',
    })
  }
}

export const addBedroom = async (req, res) => {
  try {
    const data = {
      name: req.body.name
    }
    const saveTienNghi = await new bedroom(data).save()
    res.status(200).json({
      message: 'true',
    })
  } catch (error) {
    res.status(400).json({
      message: 'false',
    })
  }
}
