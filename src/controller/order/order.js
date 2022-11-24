import user from '../../models/user'
import order from '../../models/order'
import product from '../../models/product'
import { response } from 'express'

var FCM = require('fcm-node')

const Server_key = 'AAAAXdg_118:APA91bEVZLvJ2g1mgi--7RqdkknlLqy9g-9VpsoAY2Ve8n9xd2tyMV2Ag-4V-OA6fPnTYZFXGur3nMd-qX7xdN2ryE0n4KvnngC-eUw7hsUMZQf6uWWNeIUN_v2cIDE64Pk_Hv88n7I6'
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
      isBackingPercent: req.body.isBackingPercent,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      person: req.body.person,
      phone: req.body.phone,
      pricePercent: req.body.pricePercent
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
      isBackingPercent: saveOrder.isBackingPercent,
      startDate: saveOrder.startDate,
      endDate: saveOrder.endDate,
      person: saveOrder.person,
      phone: saveOrder.phone,
      pricePercent: saveOrder.pricePercent,
      status: 'Đang chờ xác nhận',
      date: `${date.getDay() == 0 ? 'Chủ Nhật' : 'Thứ ' + date.getDay() + 1
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
        isBackingPercent: item.isBackingPercent,
        pricePercent: item.pricePercent,
        seem: item.seem,
        startDate: item.startDate,
        endDate: item.endDate,
        person: item.person,
        phone: item.phone,
        status: item.status,
        time: item.createdAt,
        isCancellationDate: item.isCancellationDate,
        cancellationDate: item.cancellationDate,
        isSuccess: item.isSuccess
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
    }, 1000)
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
      { status: req.body.status, seem: true, reasonHost: req.body.reasonHost, isSuccess: true },
      { new: true }
    )
    const dataProductUpdate = await product.findOneAndUpdate(
      { _id: dataUpdate.IdPro },
      { isStillEmpty: true },
      { new: true }
    )
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
export const ordercancel = async (req, res) => {
  try {
    const dataUpdate = await order.findOneAndUpdate(
      { IdOder: req.body.id },
      { status: req.body.status, seem: true, reasonHost: req.body.reasonHost },
      { new: true }
    )
    const dataProductUpdate = await product.findOneAndUpdate(
      { _id: dataUpdate.IdPro },
      { isStillEmpty: false },
      { new: true }
    )
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
export const updateOrderById = async (req, res) => {
  try {
    const dataUpdate = await order.findOneAndUpdate(
      { IdOder: req.body.id },
      { status: req.body.status, seem: true, reasonUser: req.body.reasonUser, cancellationDate: req.body.cancellationDate },
      { new: true }
    )
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
export const updateOrderByIdNotSeem = async (req, res) => {
  try {
    const dataUpdate = await order.findOneAndUpdate(
      { IdOder: req.body.id },
      { status: req.body.status, seem: false, reasonUser: req.body.reasonUser, cancellationDate: req.body.cancellationDate },
      { new: true }
    )
    console.log("data lsdjfk " + dataUpdate);
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
export const getOrderById = async (req, res) => {
  try {
    const dataUpdate = await order.findOne(
      { IdOder: req.params.id }
    )
    console.log(dataUpdate)
    res.status(200).json(dataUpdate)
  } catch (error) {
    res.status(401).json({
      messege: false,
    })
  }
}
export const updateStatusDone = async (req, res) => {
  try {
    const dataUpdate = await order.findOneAndUpdate(
      { IdOder: req.body.id },
      { status: 'done' },
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
export const updateStatusAccessCancel = async (req, res) => {
  try {
    const dataUpdate = await order.findOneAndUpdate(
      { IdOder: req.body.id },
      { isCancellationDate: true, seem: false },
      { new: true }
    )
    const dataProductUpdate = await product.findOneAndUpdate(
      { _id: dataUpdate.IdPro },
      { isStillEmpty: false },
      { new: true }
    )
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
export const orderNotices = async (req, res) => {
  try {
    const inforUser = await user
      .findById({ _id: req.body.idUser })
      .select(['-password', '-role', '-idcard', '-phone', '-_id'])
    const listOrderNotSeem = await order
      .find({ IdUser: req.body.idUser })
      .populate({ path: 'IdPro', model: 'Product', select: ['name', 'images'] })
      .populate({ path: 'IdHost', model: 'user', select: 'name' })
      .select(['-seem', '-_id', '-updatedAt', '-IdUser'])
    res.status(200).json({
      messege: true,
      data: listOrderNotSeem,
      userInfor: inforUser,
    })
  } catch (error) {
    res.status(401).json({
      messege: error,
    })
  }
}
export const listOrderByIdUser = async (req, res) => {
  try {
    const dataCompile = []
    const data = await order.find({ IdUser: req.params.id })
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
        isBackingPercent: item.isBackingPercent,
        pricePercent: item.pricePercent,
        seem: item.seem,
        startDate: item.startDate,
        endDate: item.endDate,
        person: item.person,
        phone: item.phone,
        status: item.status,
        time: item.createdAt,
        isCancellationDate: item.isCancellationDate,
        isSuccess: item.isSuccess
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
    }, 1000)
  } catch (error) {
    res.status(401).json({
      messege: false,
    })
  }
}
export const deleteOrderById = async (req, res) => {
  try {
    const data = await order.findOneAndDelete({
      'IdOder': req.params.id,
    })
    console.log(data);
    res.status(200).json({
      messege: true,
      data: data,
    })
  } catch (error) {
    res.status(401).json({
      messege: false
    })
  }
}
export const sendNotification = async (req, res) => {
  try {
    var fcm = new FCM(Server_key);
    var message = {
      to: 'flwO1SzNR_yGE7_5Vmo5n5:APA91bEygKPCSQZkZW1sPFtoIGDkZHJtpVGkoGSqt704obJ3VpsKMMjRf84f8lJghXBt6UcclE3MYIx0j-Y1J2rsQ2GX76NhMPWlk7qv8ajHdP_yjBGwuKsG_xqtaB7RZ8GlU8lqEOYz',
      notification: {
        title: 'Xác nhận phòng',
        body: 'Cảm ơn bạn đã sửa dụng dịch vụ của chúng tôi',
      },

      data: { //you can send only notification or only data(or include both)
        title: 'ok cdfsdsdfsd',
        body: '{"name" : "okg ooggle ogrlrl","product_id" : "123","final_price" : "0.00035"}'
      }

    };

    fcm.send(message, function (err, response) {
      if (err) {
        res.status(401).json({
          messege: false
        })
      } else {
        res.status(200).json({
          messege: true
        })
      }

    });
  } catch (error) {
    res.status(401).json({
      messege: false
    })
  }
}
