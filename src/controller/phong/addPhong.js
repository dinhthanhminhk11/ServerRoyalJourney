import phong from '../../models/Phong'
export const addPhong = async (req, res) => {
  try {
    const dataSave = {
      name: req.body.name,
      images: req.body.images,
      dienTich: req.body.dienTich,
      price: req.body.price,
      idHotel: req.body.idHotel,
      TienNghiPhong: req.body.TienNghiPhong,
      SoGiuong: req.body.SoGiuong,
      SoPhong: req.body.SoPhong,
      mota: req.body.mota
    }
    const data = await phong(dataSave).save()
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

export const deletePhong = async (req, res) => {
  try {
    const data = await phong.deleteOne({_id: req.params.id})
    res.status(200).json({
      message: 'true',
    })
  } catch (error) {
    res.status(400).json({
      // error
      message: 'false',
    })
  }
}
