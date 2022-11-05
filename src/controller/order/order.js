import user from '../../models/user'
import product from '../../models/product'
export const createOrder = async (req, res) => {
  try {
    const dataOrder = {
      IdOder: req.body.IdOder,
      IdHost: req.body.IdHost,
      IdPro: req.body.IdPro,
      IdUser: req.body.IdUser,
      payDay: req.body.payDay,
      price: req.body.price,
      cashMoney: req.body.cashMoney,
      banking: req.body.banking,
    }
    const saveOrder = await new order(dataOrder).save()
    const date = new Date(saveOrder.createdAt)
    let time = ''
    if (24 - date.getHours() - 12 == 0) {
      time = `12:${date.getMinutes()} PM`
    } else {
      time =
        24 - date.getHours() - 12 < 0
          ? `${(24 - date.getHours() - 12) * -1}:${date.getMinutes()} PM`
          : `${date.getHours()}:${date.getMinutes()} AM`
    }
    res.status(200).json({
      messege: true,
      idBill: saveOrder.IdOder,
      idPro: saveOrder.IdPro,
      idUser: saveOrder.IdUser,
      idHost: saveOrder.IdHost,
      price: saveOrder.price,
      payDay: saveOrder.payDay,
      cashMoney: saveOrder.cashMoney,
      banking: saveOrder.banking,
      status: 'Đang chờ xác nhận',
      date: `${
        date.getDay() == 0 ? 'Chủ Nhật' : 'Thứ ' + date.getDay() + 1
      }, ${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`,
      time: time,
    })
  } catch (error) {
    res.status(401).json({
      messege: false,
    })
  }
}
export const ListOrder = async (req, res) => {
  try {
    const dataCompile = []
    const data = await order.find({ IdHost: req.body.idHost })
    data.forEach(async (item) => {
      const customData = {
        idOder: item.IdOder,
        idHost: item.IdHost,
        idUser: item.IdUser,
        idProduct: item.IdPro,
        namePro: '',
        nameUser: '',
        dateCreate: item.createdAt,
        day: item.payDay,
        price: item.price,
        cashMoney: item.cashMoney,
        banking: item.banking,
        seem: item.seem,
        status: item.status,
        time: item.createdAt,
      }
      const pro = await product.findById({ _id: item.IdPro })
      const userName = await user.findById({ _id: item.IdUser })
      customData.namePro = pro.name
      customData.nameUser = userName.name
      dataCompile.push(customData)
    })
    setTimeout(() => {
      res.status(200).json({
        messege: true,
        data: dataCompile.sort((a, b) => {
          return a.time.getTime() - b.time.getTime()
        }),
      })
    }, 5000)
  } catch (error) {
    res.status(401).json({
      messege: false,
    })
  }
}

export const updateStatus = async (req, res) => {
  try {
    const dataUpdate = await order.findOneAndUpdate(
      { IdOder: req.body.id },
      { status: req.body.status, seem: true },
      { new: true }
    )
    console.log(dataUpdate)
    res.status(200).json({
      messege: true,
      data: dataUpdate,
    })
  } catch (error) {
    res.status(401).json({
      messege: false,
    })
  }
}
export const orderNotSeem = async (req, res) => {
  try {
    const listOrderNotSeem = await order.find({ IdHost: req.body.id })
    res.status(200).json({
      messege: true,
      data: listOrderNotSeem.filter((item) => item.seem == false),
    })
  } catch (error) {
    res.status(401).json({
      messege: false,
    })
  }
}
