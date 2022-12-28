import hotel from '../../models/Hotel'
export const addHotel = async (req, res) => {
  try {
    const dataSave = {
      name: req.body.name,
      images: req.body.images,
      dienTich: req.body.dienTich,
      tinh: req.body.tinh,
      huyen: req.body.huyen,
      xa: req.body.xa,
      sonha: req.body.sonha,
      idUser: req.body.idUser,
      timeDat: req.body.timeDat,
      timeTra: req.body.timeTra,
      TienNghiKS: req.body.TienNghiKS,
      yte: req.body.yte,
      longitude: req.body.longitude,
      latitude: req.body.latitude,
      mota: req.body.mota
    }
    const data = await hotel(dataSave).save()
    res.status(200).json({
      messege: 'true',
    })
  } catch (error) {
    res.status(400).json({
      messege: 'false',
      error,
    })
  }
}
