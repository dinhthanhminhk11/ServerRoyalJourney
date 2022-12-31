import phong from "../../models/Phong";

export const updatePhong = async (req, res) => {
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
        const dataUpdate = await phong.updateOne({_id:req.body._id}, dataSave)
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