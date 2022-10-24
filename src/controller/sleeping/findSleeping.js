import sleeping from '../../models/sleeping'
export const getSleepingPlaces = async (req, res) => {
  try {
    const data = await sleeping.find()
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
export const sleepingPlaces = async (req, res) => {
  try {
    const data = await sleeping.findOne({ _id: req.body.id }).exec()
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
