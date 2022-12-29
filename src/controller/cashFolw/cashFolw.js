import cash from '../../models/cashFlow'
import user from '../../models/user'

export const createCashFlow = async (req, res) => {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    try {
        const check = req.body.status
        const dataUser = user.findOne({
            _id: req.body.idUser
        })
        var priceCashFlow = parseInt(dataUser.priceCashFlow)
        if (check) {
            dataUser.findOneAndUpdate(
                { _id: req.body.idUser },
                { priceCashFlow: priceCashFlow += parseInt(req.body.price) },
                { new: true }
            )
        } else {
            dataUser.findOneAndUpdate(
                { _id: req.body.idUser },
                { priceCashFlow: priceCashFlow -= parseInt(req.body.price) },
                { new: true }
            )
        }

        const dataCashFlow = {
            idUser: req.body.idUser,
            title: req.body.title,
            content: req.body.content,
            price: req.body.price,
            imageHoust: dataProduct.images[0],
            dateTime: hours + ":" + minutes + " " + date + "/" + month + "/" + year,
            status: req.body.status
        }
        const saveCashFlow = await new cash(dataCashFlow).save()

        res.status(200).json({
            status: true,
            message: "Thêm thành công"
        })

    } catch (error) {
        res.status(401).json({
            status: false,
            message: "Thêm thất bại"
        })
    }
}

export const listCashFlow = async (req, res) => {
    try {
        const data = await cash.find({
            'idUser': req.params.id
        })
        res.status(200).json(data)
    } catch (error) {
        res.status(401).json({
            status: false,
        })
    }
}