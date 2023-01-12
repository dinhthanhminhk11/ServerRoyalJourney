import hotel from '../../models/Hotel'
export const updateSaoHotel = async (req, res) => {
  try {
    const dataUpdate = await hotel.updateOne({_id:req.params.id},
        {TbSao: req.params.TbSao})
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
export const updateHotel = async (req, res) => {
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
      giaDaoDong: req.body.giaDaoDong,
      imageConfirm: req.body.imageConfirm,
      yte: req.body.yte,
      location: {
        type: 'Point',
        coordinates: [
          parseFloat(req.body.longitude),
          parseFloat(req.body.latitude),
        ],
      },
      // longitude: req.body.longitude,
      // latitude: req.body.latitude,
      mota: req.body.mota,
      chinhsach: req.body.chinhsach,
      treEm: req.body.treEm,
      chinhSachHuy: req.body.chinhSachHuy
    }
    const dataUpdate = await hotel.updateOne({_id:req.body._id}, dataSave)
    res.status(200).json({
      Message: true
    })
  } catch (error) {
    res.status(400).json({
      messege: 'false',
      error
    })
  }
}

export const confirmHotel = async (req, res) => {
  try {
    const dataUpdate = await hotel.updateOne({_id:req.params.id},
        {checkConfirm:req.params.checkConfirm})
    res.status(200).json({
      message : "true"
    })
  } catch (error) {
    res.status(400).json({
      messege: 'false',
      error,
    })
  }
}

