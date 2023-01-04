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
        var check = req.body.status
        const dataUser = await user.findById({
            _id: req.body.idUser
        })
        var priceCashFlow = parseInt(dataUser.priceCashFlow)

        console.log(dataUser.priceCashFlow + " tiền cũ ")
        if (check) {
            console.log("check")
            const userUpdate1 = await user.findOneAndUpdate(
                { _id: req.body.idUser },
                { priceCashFlow: (priceCashFlow += parseInt(req.body.price)).toString() },
                { new: true }
            )
        } else {
            console.log("check2")

            const userUpdate2 = await user.findOneAndUpdate(
                { _id: req.body.idUser },
                { priceCashFlow: (priceCashFlow -= parseInt(req.body.price)).toString() },
                { new: true }
            )
        }

        console.log(dataUser.priceCashFlow + " tiền mới ")


        const dataCashFlow = {
            idUser: req.body.idUser,
            title: req.body.title,
            content: req.body.content,
            price: req.body.price,
            dateTime: hours + ":" + minutes + " " + date + "-" + month + "-" + year,
            status: req.body.status
        }
        const saveCashFlow = await new cash(dataCashFlow).save()

        res.status(200).json({
            status: true,
            message: "Thêm thành công"
        })

    } catch (error) {
        console.log(error)
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
        res.status(200).json(data.reverse())
    } catch (error) {
        res.status(404).json({
            status: false,
        })
    }
}