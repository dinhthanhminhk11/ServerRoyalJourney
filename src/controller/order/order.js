import user from '../../models/user'
import order from '../../models/order'
import product from '../../models/product'
import noti from '../../models/Noti'
import hotel from '../../models/Hotel'
import room from "../../models/Phong"
import e, { response } from 'express'
import Hotel from "../../models/Hotel";
import User from "../../models/user";
import cash from '../../models/cashFlow'
const { sendMailComfirmBooking } = require('../../services/MAIL');
const { sendMailCheckOut, sendMailComfirmCancelByUser, sendMailComfirmCancelByHost } = require('../../services/MAIL');
var FCM = require('fcm-node')

const Server_key = 'AAAAXdg_118:APA91bEVZLvJ2g1mgi--7RqdkknlLqy9g-9VpsoAY2Ve8n9xd2tyMV2Ag-4V-OA6fPnTYZFXGur3nMd-qX7xdN2ryE0n4KvnngC-eUw7hsUMZQf6uWWNeIUN_v2cIDE64Pk_Hv88n7I6'

var fcm = new FCM(Server_key);

export const createOrder = async (req, res) => {
  var randomId = "RJ " + Math.floor(Math.random() * (1000000 - 1000000 + 1000000) + 1000000)
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();

  var currentDate = new Date(new Date().getTime() + 48 * 60 * 60 * 1000);
  let dateTomoro = currentDate.getDate()
  let monthTomoro = currentDate.getMonth() + 1;
  let yearTomoro = currentDate.getFullYear();


  try {
    const dataOrder = {
      idOrder: randomId,
      idHost: req.body.idHost,
      idUser: req.body.idUser,
      idHotel: req.body.idHotel,
      idRoom: req.body.idRoom,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      payDay: req.body.payDay,
      countRoom: req.body.countRoom,
      numberGuests: req.body.numberGuests,
      phone: req.body.phone,
      specialRequirements: req.body.specialRequirements,
      priceAll: req.body.priceAll,
      priceAdmin: req.body.priceAll * 0.1,
      priceEnterprise: req.body.priceAll * 0.9,
      cashMoney: req.body.cashMoney,
      banking: req.body.banking,
      dateCreate: date + "/" + month + "/" + year,
      timeCreate: hours + ":" + minutes + ":" + seconds,
      refundDate: dateTomoro + "/" + monthTomoro + "/" + yearTomoro
    }

    console.log(dataOrder)
    const saveOrder = await new order(dataOrder).save()

    if (saveOrder.banking) {
      const dataUser = await User.findById({ _id: saveOrder.idUser })
      const dataHotel = await hotel.findById({ _id: saveOrder.idHotel })
      var price = parseInt(dataUser.priceCashFlow) - saveOrder.priceAll;

      const dataUserUpdate = await user.findOneAndUpdate(
        { _id: dataUser._id },
        { priceCashFlow: String(price) },
        { new: true }
      )

      const dataCashFlow = {
        idUser: dataUserUpdate._id,
        title: "Thông báo biến động số dư",
        content: "Thanh toán phòng từ khách sạn " + dataHotel.name,
        price: saveOrder.priceAll,
        dateTime: hours + ":" + minutes + " " + date + "-" + month + "-" + year,
        status: false
      }
      const saveCashFlow = await new cash(dataCashFlow).save()
    }

    res.status(200).json({
      message: true,
      dataOrder: saveOrder,
    })
  } catch (error) {
    console.log(error)
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
        reasonUser: item.reasonUser,
        person: item.person,
        phone: item.phone,
        status: item.status,
        time: item.createdAt,
        isCancellationDate: item.isCancellationDate,
        cancellationDate: item.cancellationDate,
        isSuccess: item.isSuccess,
        checkedOut: item.checkedOut
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
        }).reverse(),
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
      { _id: req.body.id },
      {
        status: req.body.status, seem: true, reasonHost: req.body.reasonHost, isSuccess: true,
        content: "Chủ phòng đã tiếp nhận yêu cầu đặt phòng của bạn"
      },
      { new: true }
    )
    const dataRoomBefore = await room.findById({ _id: dataUpdate.idRoom })

    var countRoomBefore = dataRoomBefore.SoPhong - dataUpdate.countRoom

    const dataRoom = await room.findOneAndUpdate(
      { _id: dataUpdate.idRoom }
      ,
      {
        SoPhong: countRoomBefore
      },
      {
        new: true
      })

    // const dataProductUpdate = await product.findOneAndUpdate(
    //   { _id: dataUpdate.IdPro },
    //   { isStillEmpty: true },
    //   { new: true }
    // )

    // const dataOrderMutil = await order.updateMany({
    //         status: 'Đang chờ',
    //         IdPro: dataUpdate.IdPro
    //     }, {
    //         $set: {
    //             status: "Chủ đã huỷ", seem: true, reasonHost: "Hết Phòng"
    //         }
    //     }
    // )

    // const dataOrder = await order.findOne({
    //   IdOder: req.body.id
    // })
    // const dataUser = await user.findOne({
    //   _id: dataOrder.IdUser
    // })

    // const dataProduct = await product.findOne({
    //   _id: dataOrder.IdPro
    // })

    // var message = {
    //   to: dataUser.tokenDevice,
    //   data: { //you can send only notification or only data(or include both)
    //     title: 'Yêu cầu không được chấp nhận',
    //     body: 'Chủ phòng ' + dataProduct.name + ' đã từ chối bạn. Lí do: "' + req.body.reasonHost +'"',
    //     idOder: dataOrder.IdOder,
    //     image: dataProduct.images[0]
    //   },
    //   android:{
    //     "priority":"normal"
    //   }
    // };
    // fcm.send(message, function (err, response) {
    //   if (err) {
    //     res.status(401).json({
    //       messege: false
    //     })
    //   } else {
    //     res.status(200).json({
    //       messege: true
    //     })
    //   }
    // });


    res.status(200).json({
      messege: true,
      data: dataUpdate,
    })
  } catch (error) {
    console.log(error)
    res.status(401).json({
      messege: false,
    })
  }
}
export const ordercancel = async (req, res) => {
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  try {

    const dataBill = await order.findById({ _id: req.body.id })
    const dataUser = await User.findById({ _id: dataBill.idUser })
    const dataHotel = await hotel.findById({ _id: dataBill.idHotel })

    var price = parseInt(dataUser.priceCashFlow) + dataBill.priceAll;

    if (dataBill.banking) {

      const dataUpdate = await order.findOneAndUpdate(
        { _id: req.body.id },
        {
          status: req.body.status, seem: true, reasonHost: req.body.reasonHost,
          content: "Do chủ phòng đã từ chối yêu cầu của bạn, số tiền đã được chuyển vào ví RoyalJourneySuper Account của bạn"
        },
        { new: true }
      )

      const dataUserUpdate = await user.findOneAndUpdate(
        { _id: dataUser._id },
        { priceCashFlow: String(price) },
        { new: true }
      )

      const dataCashFlow = {
        idUser: dataUserUpdate._id,
        title: "Thông báo biến động số dư",
        content: "Khách sạn " + dataHotel.name + " hoàn tiền do chủ khách sạn không tiếp nhận yêu cầu đặt phòng của bạn",
        price: dataBill.priceAll,
        dateTime: hours + ":" + minutes + " " + date + "-" + month + "-" + year,
        status: true
      }
      const saveCashFlow = await new cash(dataCashFlow).save()

    } else {
      const dataUpdate = await order.findOneAndUpdate(
        { _id: req.body.id },
        {
          status: req.body.status, seem: true, reasonHost: req.body.reasonHost,
          content: "Chủ phòng đã từ chối yêu cầu của bạn"
        },
        { new: true }
      )
    }


    res.status(200).json({
      messege: true,
      data: dataBill,
    })
  } catch (error) {
    console.log(error)
    res.status(401).json({
      messege: false,
    })
  }
}

function stringToDate(_date, _format, _delimiter) {
  var formatLowerCase = _format.toLowerCase();
  var formatItems = formatLowerCase.split(_delimiter);
  var dateItems = _date.split(_delimiter);
  var monthIndex = formatItems.indexOf("mm");
  var dayIndex = formatItems.indexOf("dd");
  var yearIndex = formatItems.indexOf("yyyy");
  var month = parseInt(dateItems[monthIndex]);
  month -= 1;
  var formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
  return formatedDate;
}

function isBefore(date1, date2) {
  return date1 < date2;
}

export const updateOrderById = async (req, res) => {
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  try {

    // const dataBill = await order.findById({ _id: req.body.id })
    // const dataHotel = await hotel.findById({ _id: dataBill.idHotel })
    // const dataUser = await user.findById({ _id: dataBill.idUser })
    // const dateNow = stringToDate(date + "/" + month + "/" + year, "dd/MM/yyyy", "/")
    // const dateCancel = stringToDate(dataBill.refundDate, "dd/MM/yyyy", "/")

    // const dataBillUpdate = await order.findOneAndUpdate(
    //   { _id: req.body.id },
    //   {
    //     status: req.body.status,
    //     seem: true,
    //     reasonUser: req.body.reasonUser,
    //     cancellationDate: date + "/" + month + "/" + year,
    //     timeCancellation: hours + ":" + minutes + ":" + seconds,
    //     priceAdmin: 0,
    //     priceEnterprise: 0
    //   },
    //   { new: true }
    // )

    // var price = parseInt(dataUser.priceCashFlow) + dataBill.priceAll

    // console.log(price)
    // if (dataBill.chinhSachHuy) {
    //   const dataBillUpdate = await order.findOneAndUpdate(
    //     { _id: req.body.id },
    //     {
    //       status: req.body.status,
    //       seem: true,
    //       reasonUser: req.body.reasonUser,
    //       cancellationDate: date + "/" + month + "/" + year,
    //       timeCancellation: hours + ":" + minutes + ":" + seconds,
    //       priceAdmin: 0,
    //       priceEnterprise: 0
    //     },
    //     { new: true }
    //   )
    //   const dataUserUpdate = await user.findOneAndUpdate(
    //     { _id: dataBill.idUser },
    //     { priceCashFlow: String(price) },
    //     { new: true }
    //   )
    //   const dataCashFlow = {
    //     idUser: dataUser._id,
    //     title: "Thông báo biến động số dư",
    //     content: "Hoàn huỷ từ khách sạn " + dataHotel.name,
    //     price: dataBill.priceAll,
    //     dateTime: hours + ":" + minutes + " " + date + "-" + month + "-" + year,
    //     status: true
    //   }
    //   const saveCashFlow = await new cash(dataCashFlow).save()

    // } else {
    //   if (isBefore(dateNow, dateCancel)) {
    //     const dataBillUpdate1 = await order.findOneAndUpdate(
    //       { _id: req.body.id },
    //       {
    //         status: req.body.status,
    //         seem: true,
    //         reasonUser: req.body.reasonUser,
    //         cancellationDate: date + "/" + month + "/" + year,
    //         timeCancellation: hours + ":" + minutes + ":" + seconds,
    //         priceAdmin: 0,
    //         priceEnterprise: 0
    //       },
    //       { new: true }
    //     )
    //     const dataUserUpdate1 = await user.findOneAndUpdate(
    //       { _id: dataBill.idUser },
    //       { priceCashFlow: String(price) },
    //       { new: true }
    //     )
    //     const dataCashFlow1 = {
    //       idUser: dataUser._id,
    //       title: "Thông báo biến động số dư",
    //       content: "Hoàn huỷ từ khách sạn " + dataHotel.name,
    //       price: dataBill.priceAll,
    //       dateTime: hours + ":" + minutes + " " + date + "-" + month + "-" + year,
    //       status: true
    //     }
    //     const saveCashFlow1 = await new cash(dataCashFlow1).save()
    //   } else {
    //     const dataBillUpdate1 = await order.findOneAndUpdate(
    //       { _id: req.body.id },
    //       {
    //         status: req.body.status,
    //         seem: true,
    //         reasonUser: req.body.reasonUser,
    //         cancellationDate: date + "/" + month + "/" + year,
    //         timeCancellation: hours + ":" + minutes + ":" + seconds,
    //       },
    //       { new: true }
    //     )
    //   }
    // }

    const dataUpdate = await order.findOneAndUpdate(
      { _id: req.body.id },
      {
        status: req.body.status,
        seem: true,
        reasonUser: req.body.reasonUser,
        cancellationDate: date + "/" + month + "/" + year,
        timeCancellation: hours + ":" + minutes + ":" + seconds,
      },
      { new: true }
    )
    res.status(200).json({
      messege: true,
      data: dataUpdate,
    })
  } catch (error) {
    console.log(error)
    res.status(401).json({
      messege: false,
    })
  }
}
export const updateOrderByIdNotSeem = async (req, res) => {
  try {
    const dataUpdate = await order.findOneAndUpdate(
      { IdOder: req.body.id },
      {
        status: req.body.status,
        seem: false,
        reasonUser: req.body.reasonUser,
        cancellationDate: req.body.cancellationDate
      },
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
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  try {

    const dataBill = await order.findById({ _id: req.body.id })
    const dataHotel = await hotel.findById({ _id: dataBill.idHotel })
    const dataUser = await user.findById({ _id: dataBill.idUser })
    const dateNow = stringToDate(date + "/" + month + "/" + year, "dd/MM/yyyy", "/")
    const dateCancel = stringToDate(dataBill.refundDate, "dd/MM/yyyy", "/")
    const dataRoom = await room.findById({ _id: dataBill.idRoom })
    var price = parseInt(dataUser.priceCashFlow) + dataBill.priceAll
    if (dataBill.banking) {
      if (dataHotel.chinhSachHuy) {
        // có cho huỷ
        const dataUpdate = await order.findOneAndUpdate(
          { _id: req.body.id },
          {
            isCancellationDate: true,
            seem: true,
            priceAdmin: 0,
            priceEnterprise: 0,
            content: "Số tiền đã được chuyển vào ví RoyalJourneySuper Account của bạn"
          },
          { new: true }
        )
        const dataUserUpdate1 = await user.findOneAndUpdate(
          { _id: dataBill.idUser },
          { priceCashFlow: String(price) },
          { new: true }
        )

        const dataCashFlow = {
          idUser: dataUser._id,
          title: "Thông báo biến động số dư",
          content: "Hoàn huỷ từ khách sạn " + dataHotel.name,
          price: dataBill.priceAll,
          dateTime: hours + ":" + minutes + " " + date + "-" + month + "-" + year,
          status: true
        }
        const saveCashFlow = await new cash(dataCashFlow).save()
      } else {
        // check ngày huỷ
        if (isBefore(dateNow, dateCancel)) {
          // huỷ đúng hạn
          const dataUpdate = await order.findOneAndUpdate(
            { _id: req.body.id },
            {
              isCancellationDate: true,
              seem: true,
              priceAdmin: 0,
              priceEnterprise: 0,
              content: "Số tiền đã được chuyển vào ví RoyalJourneySuper Account của bạn"
            },
            { new: true }
          )
          const dataUserUpdate1 = await user.findOneAndUpdate(
            { _id: dataBill.idUser },
            { priceCashFlow: String(price) },
            { new: true }
          )

          const dataCashFlow = {
            idUser: dataUser._id,
            title: "Thông báo biến động số dư",
            content: "Hoàn huỷ từ khách sạn " + dataHotel.name,
            price: dataBill.priceAll,
            dateTime: hours + ":" + minutes + " " + date + "-" + month + "-" + year,
            status: true
          }
          const saveCashFlow = await new cash(dataCashFlow).save()

        } else {
          //huỷ sai hạn
          const dataUpdate = await order.findOneAndUpdate(
            { _id: req.body.id },
            {
              isCancellationDate: true, seem: true,
              content: "Huỷ sai hạn chúng tôi không thể hoàn tiền cho bạn!"
            },
            { new: true }
          )
        }
      }
    } else {
      // không chuyển khoản
      const dataUpdate = await order.findOneAndUpdate(
        { _id: req.body.id },
        {
          isCancellationDate: true, seem: true,
        },
        { new: true }
      )
    }

    var countRoomBefore = dataRoom.SoPhong + dataBill.countRoom
    if (dataBill.isSuccess) {
      const dataRoomUpdate = await room.findOneAndUpdate(
        { _id: dataBill.idRoom }
        ,
        {
          SoPhong: countRoomBefore
        },
        {
          new: true
        })
    }

    const dataUpdate = await order.findOneAndUpdate(
      { _id: req.body.id },
      {
        isCancellationDate: true, seem: true,
      },
      { new: true }
    )
    // const dataProductUpdate = await product.findOneAndUpdate(
    //   { _id: dataUpdate.IdPro },
    //   { isStillEmpty: false },
    //   { new: true }
    // )
    const dataUser1 = await user.findOneAndUpdate(
      { _id: dataUpdate.idUser },
      { countBooking: dataUser.countBooking -= 1 },
      { new: true }
    )
    res.status(200).json({
      messege: true,
      data: dataUpdate,
    })
  } catch (error) {
    console.log(error)
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
        isSuccess: item.isSuccess,
        checkedOut: item.checkedOut
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
          return b.time.getTime() - a.time.getTime()
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
    var message = {
      to: 'd0uw1UO0RCGCMbteSM-SZs:APA91bHzunneO25hFcpKIJZH_GNRCW1Bdvth5HbAxUOP7hdkYo9Gh7jI0YfLm8YDSLJToOmQ-nNITGLHgHmHA9tFD30cvvKUIUa9sGnrrOPVDd9OQ4bh9KLm-a630SyCk436Bu2xYNQK',
      data: { //you can send only notification or only data(or include both)
        title: 'Xác nhận phòng',
        body: 'Cảm ơn bạn đã sửa dụng dịch vụ của chúng tôi',
        idOder: "RJ2096268",
        image: "https://danviet.mediacdn.vn/2021/1/6/13197933916907312977860828685791406656205212o-16099346980101815349486.jpg"
      },
      android: {
        "priority": "normal"
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

export const senNotificationAccess = async (req, res) => {
  try {
    const dataOrder = await order.findOne({
      _id: req.body.id
    })
    const dataUser = await user.findOne({
      _id: dataOrder.idUser
    })

    const dataHotel = await Hotel.findById({ _id: dataOrder.idHotel })
    var message = {
      to: dataUser.tokenDevice,
      data: { //you can send only notification or only data(or include both)
        title: 'Xác nhận phòng',
        body: 'Yêu cầu đặt phòng của bạn đã được ' + dataHotel.name + ' chấp nhận',
        idOder: dataOrder._id,
        image: dataHotel.images[0]
      },
      android: {
        "priority": "normal"
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
    console.log(error)
    res.status(401).json({
      messege: false
    })
  }
}

export const senNotificationCancel = async (req, res) => {
  try {
    const dataOrder = await order.findOne({
      _id: req.body.id
    })
    const dataUser = await user.findOne({
      _id: dataOrder.idUser
    })

    const dataHotel = await Hotel.findById({ _id: dataOrder.idHotel })
    var message = {
      to: dataUser.tokenDevice,
      data: { //you can send only notification or only data(or include both)
        title: 'Yêu cầu không được chấp nhận',
        body: 'Chủ phòng ' + dataHotel.name + ' đã từ chối bạn. Lí do: "' + req.body.reasonHost + '"',
        idOder: dataOrder._id,
        image: dataHotel.images[0]
      },
      android: {
        "priority": "normal"
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
    console.log(error)

    res.status(401).json({
      messege: false
    })
  }
}

export const senNotificationRequestCancel = async (req, res) => {
  try {
    const dataOrder = await order.findOne({
      _id: req.body.id
    })
    const dataUser = await user.findOne({
      _id: dataOrder.idUser
    })

    const dataHotel = await Hotel.findById({ _id: dataOrder.idHotel })
    var message = {
      to: dataUser.tokenDevice,
      data: { //you can send only notification or only data(or include both)
        title: 'Xác nhận huỷ phòng',
        body: 'Chủ phòng ' + dataHotel.name + ' đã chấp nhận yêu cầu huỷ phòng của bạn',
        idOder: dataOrder._id,
        image: dataHotel.images[0]
      },
      android: {
        "priority": "normal"
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
    console.log(error)

    res.status(401).json({
      messege: false
    })
  }
}

export const senMailnAccess = async (req, res) => {
  try {
    const dataOrder = await order.findOne({
      _id: req.body.id
    })
    const dataUser = await user.findOne({
      _id: dataOrder.idUser
    })

    const dataHost = await user.findOne({
      _id: dataOrder.idHost
    })

    const dataHotel = await Hotel.findById({ _id: dataOrder.idHotel })

    // const dataProduct = await product.findOne({
    //     _id: dataOrder.IdPro
    // })

    await sendMailComfirmBooking({
      to: dataUser.email,
      phone: dataOrder.phone,
      nameUser: dataUser.name,
      endDate: dataOrder.endDate,
      startDate: dataOrder.startDate,
      countDay: dataOrder.payDay,
      countPerson: dataOrder.person,
      namePro: dataHotel.name,
      address: dataHotel.sonha + ", " + dataHotel.xa + ", " + dataHotel.huyen + ", " + dataHotel.tinh,
      nameHost: dataHost.name,
      image1: dataHotel.images[0],
      image3: dataHotel.images[3],
      image2: dataHotel.images[2],
      image4: dataHotel.images[4],
    });
  } catch (error) {
    res.status(401).json({
      messege: false
    })
  }
}

export const checkedOutRoom = async (req, res) => {
  try {
    const dataUpdate = await order.findOneAndUpdate(
      { _id: req.body.id },
      {
        checkedOut: true, status: 'Đã trả phòng',
        content: "Đã trả phòng cảm ơn quý khách đã sửa dụng dịch vụ của chúng tôi"
      },
      { new: true }
    )
    const dataRoom = await room.findById({ _id: dataUpdate.idRoom })

    const userUpdate = await user.findById({ _id: dataUpdate.idUser })

    const dataUser = await user.findOneAndUpdate(
      { _id: dataUpdate.idUser },
      { countBooking: userUpdate.countBooking += 1 },
      { new: true }
    )

    var countRoomBefore = dataRoom.SoPhong + dataUpdate.countRoom

    const dataRoomUpdate = await room.findOneAndUpdate(
      { _id: dataUpdate.idRoom }
      ,
      {
        SoPhong: countRoomBefore
      },
      {
        new: true
      })

    res.status(200).json({
      messege: true,
      data: dataUpdate,
    })

  } catch (error) {
    res.status(200).json({
      messege: true,
      status: "Lỗi",
    })
  }
}

export const senNotificationRequestCheckOut = async (req, res) => {
  try {
    const dataOrder = await order.findOne({
      _id: req.body.id
    })
    const dataUser = await user.findOne({
      _id: dataOrder.idUser
    })

    const dataHotel = await Hotel.findById({ _id: dataOrder.idHotel })
    var message = {
      to: dataUser.tokenDevice,
      data: { //you can send only notification or only data(or include both)
        title: 'Hoàn tất',
        body: 'Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi, Chủ phòng ' + dataHotel.name + ' ý kiến của bạn sẽ là động lực cho chúng tôi phát triển và hoàn thiện hơn',
        idOder: dataOrder._id,
        image: dataHotel.images[0]
      },
      android: {
        "priority": "normal"
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

export const senMailCheckOutPost = async (req, res) => {
  try {
    const dataOrder = await order.findOne({
      _id: req.body.id
    })
    const dataUser = await user.findOne({
      _id: dataOrder.idUser
    })

    const dataHost = await user.findOne({
      _id: dataOrder.idHost
    })

    const dataHotel = await Hotel.findById({ _id: dataOrder.idHotel })

    await sendMailCheckOut({
      to: dataUser.email,
      phone: dataOrder.phone,
      nameUser: dataUser.name,
      endDate: dataOrder.endDate,
      startDate: dataOrder.startDate,
      countDay: dataOrder.payDay,
      countPerson: dataOrder.person,
      namePro: dataHotel.name,
      address: dataHotel.sonha + ", " + dataHotel.xa + ", " + dataHotel.huyen + ", " + dataHotel.tinh,
      nameHost: dataHost.name,
      image1: dataHotel.images[0],
      image3: dataHotel.images[3],
      image2: dataHotel.images[2],
      image4: dataHotel.images[4],
    });
  } catch (error) {
    res.status(401).json({
      messege: false
    })
  }
}

export const sendMailComfirmCancelByUserPost = async (req, res) => {
  try {
    const dataOrder = await order.findOne({
      _id: req.body.id
    })
    const dataUser = await user.findOne({
      _id: dataOrder.idUser
    })

    const dataHost = await user.findOne({
      _id: dataOrder.idHost
    })

    const dataHotel = await Hotel.findById({ _id: dataOrder.idHotel })

    await sendMailComfirmCancelByUser({
      to: dataUser.email,
      phone: dataOrder.phone,
      nameUser: dataUser.name,
      endDate: dataOrder.endDate,
      startDate: dataOrder.startDate,
      countDay: dataOrder.payDay,
      countPerson: dataOrder.person,
      namePro: dataHotel.name,
      address: dataHotel.sonha + ", " + dataHotel.xa + ", " + dataHotel.huyen + ", " + dataHotel.tinh,
      nameHost: dataHost.name,
      image1: dataHotel.images[0],
      image3: dataHotel.images[3],
      image2: dataHotel.images[2],
      image4: dataHotel.images[4],
    });
  } catch (error) {
    res.status(401).json({
      messege: false
    })
  }
}

export const sendMailComfirmCancelByHostPost = async (req, res) => {
  try {
    const dataOrder = await order.findOne({
      _id: req.body.id
    })
    const dataUser = await user.findOne({
      _id: dataOrder.idUser
    })

    const dataHost = await user.findOne({
      _id: dataOrder.idHost
    })

    const dataHotel = await Hotel.findById({ _id: dataOrder.idHotel })

    await sendMailComfirmCancelByHost({
      to: dataUser.email,
      phone: dataOrder.phone,
      nameUser: dataUser.name,
      endDate: dataOrder.endDate,
      startDate: dataOrder.startDate,
      countDay: dataOrder.payDay,
      countPerson: dataOrder.person,
      namePro: dataHotel.name,
      address: dataHotel.sonha + ", " + dataHotel.xa + ", " + dataHotel.huyen + ", " + dataHotel.tinh,
      nameHost: dataHost.name,
      image1: dataHotel.images[0],
      image3: dataHotel.images[3],
      image2: dataHotel.images[2],
      image4: dataHotel.images[4],
    });
  } catch (error) {
    res.status(401).json({
      messege: false
    })
  }
}

export const checkMuiltuNoti = async (req, res) => {
  try {
    const dataOrderMutil = await order.updateMany({
      status: 'Đang chờ'
    }, {
      $set: {
        status: "Chủ đã huỷ", seem: true, reasonHost: "Hết Phòng"
      }
    }
    )
    // res.status(200).json({
    //   messege: false,
    //   data: dataOrder
    // })

  } catch (error) {
    res.status(401).json({
      messege: false
    })
  }
}


export const createNotiAccess = async (req, res) => {
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  try {
    const dataOrder = await order.findOne({
      _id: req.body.id
    })

    const dataHotel = await Hotel.findById({ _id: dataOrder.idHotel })

    const dataProduct = await product.findOne({
      _id: dataOrder.IdPro
    })

    const dataNewNoti = {
      idOder: dataOrder._id,
      idUser: dataOrder.idUser,
      title: 'Xác nhận phòng',
      content: 'Yêu cầu đặt phòng của bạn đã được ' + dataHotel.name + ' chấp nhận',
      imageHoust: dataHotel.images[0],
      date: date + "/" + month + "/" + year,
      time: hours + ":" + minutes + ":" + seconds
    }
    const saveOrder = await new noti(dataNewNoti).save()
    res.status(200).json({
      messege: true,
      data: saveOrder
    })

  } catch (error) {
    console.log(error)
    res.status(401).json({
      messege: false
    })
  }
}

export const createNotiCancel = async (req, res) => {
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  try {
    const dataOrder = await order.findOne({
      _id: req.body.id
    })

    const dataHotel = await Hotel.findById({ _id: dataOrder.idHotel })

    const dataNewNoti = {
      idOder: dataOrder._id,
      idUser: dataOrder.idUser,
      title: 'Yêu cầu không được chấp nhận',
      content: 'Khách sạn ' + dataHotel.name + ' đã từ chối bạn. Lí do: "' + req.body.reasonHost + '"',
      imageHoust: dataHotel.images[0],
      date: date + "/" + month + "/" + year,
      time: hours + ":" + minutes + ":" + seconds
    }
    const saveOrder = await new noti(dataNewNoti).save()
    res.status(200).json({
      messege: true,
      data: saveOrder
    })

  } catch (error) {
    console.log(error)
    res.status(401).json({
      messege: false
    })
  }
}

export const createNotiAccessCancel = async (req, res) => {
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  try {
    const dataOrder = await order.findOne({
      _id: req.body.id
    })

    const dataHotel = await Hotel.findById({ _id: dataOrder.idHotel })

    const dataNewNoti = {
      idOder: dataOrder._id,
      idUser: dataOrder.idUser,
      title: 'Xác nhận huỷ phòng',
      content: 'Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi, Chủ phòng ' + dataHotel.name + ' ý kiến của bạn sẽ là động lực cho chúng tôi phát triển và hoàn thiện hơn',
      imageHoust: dataHotel.images[0],
      date: date + "/" + month + "/" + year,
      time: hours + ":" + minutes + ":" + seconds
    }
    const saveOrder = await new noti(dataNewNoti).save()
    res.status(200).json({
      messege: true,
      data: saveOrder
    })

  } catch (error) {
    console.log(error)
    res.status(401).json({
      messege: false
    })
  }
}

export const createNotiSuccess = async (req, res) => {
  let ts = Date.now();
  let date_ob = new Date(ts);
  let date = date_ob.getDate();
  let month = date_ob.getMonth() + 1;
  let year = date_ob.getFullYear();
  let hours = date_ob.getHours();
  let minutes = date_ob.getMinutes();
  let seconds = date_ob.getSeconds();
  try {
    const dataOrder = await order.findOne({
      _id: req.body.id
    })

    const dataHotel = await Hotel.findById({ _id: dataOrder.idHotel })

    const dataNewNoti = {
      idOder: dataOrder._id,
      idUser: dataOrder.idUser,
      title: 'Hoàn tất',
      content: 'Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi, Chủ phòng ' + dataHotel.name + ' ý kiến của bạn sẽ là động lực cho chúng tôi phát triển và hoàn thiện hơn',
      imageHoust: dataHotel.images[0],
      date: date + "/" + month + "/" + year,
      time: hours + ":" + minutes + ":" + seconds
    }
    const saveOrder = await new noti(dataNewNoti).save()
    res.status(200).json({
      messege: true,
      data: saveOrder
    })

  } catch (error) {
    console.log(error)
    res.status(401).json({
      messege: false
    })
  }
}

export const listNotificationByUser = async (req, res) => {
  try {
    const dataNoti = await noti.find({
      idUser: req.params.id
    })
    res.status(200).json({
      messege: true,
      data: dataNoti.reverse()
    })

  } catch (error) {
    res.status(401).json({
      messege: false
    })
  }
}

export const updateNotiSeen = async (req, res) => {
  try {
    const dataNoti = await noti.findOneAndUpdate(
      { _id: req.params.id },
      { isSeem: false },
      { new: true }
    )
    res.status(200).json({
      status: true,
      message: 'Update success',
    })

  } catch (error) {
    res.status(400).json({
      status: false,
      message: 'Update faild',
    })
  }
}

export const listNotibyUserIdNotSeem = async (req, res) => {
  try {
    const dataNoti = await noti.find({
      idUser: req.params.id,
      isSeem: true
    })
    res.status(200).json({
      status: true,
      size: dataNoti.length,
    })

  } catch (error) {
    res.status(401).json({
      status: false,
      message: 'Update faild',
    })
  }
}

export const listProductAccessByUserId = async (req, res) => {
  try {
    const data = await order.find({ IdUser: req.params.id, checkedOut: true })


    res.status(200).json({
      messege: true,
      data: data
    })
  } catch (error) {
    res.status(404).json({
      messege: false,
    })
  }
}

export const getHouseResponseByServer = async (req, res) => {
  try {
    let ts = Date.now();
    let date_ob = new Date(ts);
    let date = date_ob.getDate();
    let month = date_ob.getMonth() + 1;
    let year = date_ob.getFullYear();
    let hours = date_ob.getHours();
    let minutes = date_ob.getMinutes();
    let seconds = date_ob.getSeconds();

    const data = date + "/" + month + "/" + year
    res.status(200).json(data)
  } catch (error) {
    res.status(400).json({
      error
    })
  }
}

export const getBillById = async (req, res) => {
  try {
    const dataBill = await order.findById(
      { _id: req.params.id }
    )
    const dataRoom = await room.findById({ _id: dataBill.idRoom })
    const dataHotel = await hotel.findById({ _id: dataBill.idHotel })
    const dataHost = await User.findById({ _id: dataBill.idHost })
    res.status(200).json({
      idHotel: dataHotel._id,
      nameHost: dataHost.name,
      imageHost: dataHost.image,
      idOrder: dataBill._id,
      nameHouse: dataHotel.name,
      startHotel: dataHotel.TbSao,
      imageHotel: dataHotel.images[0],
      policyHotel: dataHotel.chinhSachHuy,
      nameRoom: dataRoom.name,
      bedroom: dataRoom.bedroom,
      priceRoom: dataRoom.price,
      startDate: dataBill.startDate,
      endDate: dataBill.endDate,
      payDay: dataBill.payDay,
      countRoom: dataBill.countRoom,
      numberGuests: dataBill.numberGuests,
      phone: dataBill.phone,
      specialRequirements: dataBill.specialRequirements,
      priceAll: dataBill.priceAll,
      cashMoney: dataBill.cashMoney,
      banking: dataBill.banking,
      seem: dataBill.seem,
      status: dataBill.status,
      reasonUser: dataBill.reasonUser,
      reasonHost: dataBill.reasonHost,
      isCancellationDate: dataBill.isCancellationDate,
      isSuccess: dataBill.isSuccess,
      checkedOut: dataBill.checkedOut,
      checkDataCancel: dataBill.refundDate,
      dateCreate: dataBill.dateCreate,
      timeCreate: dataBill.timeCreate,
      content: dataBill.content
    })
  } catch (error) {
    res.status(401).json({
      messege: false,
    })
  }
}

export const listBillByUserId = async (req, res) => {
  try {
    const dataCompile = []
    const data = await order.find({ idUser: req.params.id })
    data.forEach(async (item) => {
      const dataHotel = await hotel.findById({ _id: item.idHotel })
      const customData = {
        idBill: item._id,
        codeBill: item.idOrder,
        nameHotel: dataHotel.name,
        countPerson: item.numberGuests,
        timeCreate: item.timeCreate,
        imageHotel: dataHotel.images[0],
        startDate: item.startDate,
        endDate: item.endDate,
        timeInRoom: dataHotel.timeDat,
        timeOutRoom: dataHotel.timeTra,
        countDay: item.payDay,
        price: item.priceAll,
        status: item.status
      }
      dataCompile.push(customData)
    })

    setTimeout(() => {
      res.status(200).json(dataCompile.reverse())
    }, 1000)
  } catch (error) {
    res.status(401).json({
      messege: false,
    })
  }
}

export const getAllOrderById = async (req, res) => {
  try {
    const dataSuccess = []
    const data = await order.find(
      { idHost: req.params.idHost }
    )
    data.forEach(async (item) => {
      const dataRoom = await room.findById({ _id: item.idRoom })
      const dataHotel = await Hotel.findById({ _id: item.idHotel })
      const dataUser = await User.findById({ _id: item.idUser })
      const result = {
        _id: item._id,
        data: item,
        nameUser: dataUser.name,
        emailUser: dataUser.email,
        namePhong: dataRoom.name,
        nameHotel: dataHotel.name,
        status: item.status,
        seem: item.seem,
        isCancellationDate: item.isCancellationDate
      }
      dataSuccess.push(result)
    })

    setTimeout(() => {
      res.status(200).json(dataSuccess.reverse())
    }, 1500)

  } catch (error) {
    res.status(401).json({
      messege: false,
    })
  }
}


export const getDataCancelBooking = async (req, res) => {
  try {
    const dataBill = await order.findById({ _id: req.params.id })
    // const dataRoom = await room.findById({ _id: dataBill.idRoom })
    const dataHotel = await Hotel.findById({ _id: dataBill.idHotel })
    const dataHost = await User.findById({ _id: dataBill.idHost })
    res.status(200).json({
      imageHost: dataHost.image,
      nameHost: dataHost.name,
      checkDataCancel: dataHotel.chinhSachHuy,
      dataCancelByUser: dataBill.refundDate
    })
  } catch (error) {
    res.status(401).json({
      messege: false,
    })
  }
}

export const searchLocationAndHotel = async (req, res) => {
  try {
    const dataCompile = []

    const dataLoaction = [
      {
        nameHotel: "Hà Nội",
        address: "Địa điểm",
        type: 1
      },
      {
        nameHotel: "Hải dương",
        address: "Địa điểm",
        type: 1
      },
      {
        nameHotel: "Nam Định",
        address: "Địa điểm",
        type: 1
      },
      {
        nameHotel: "Hà Giang",
        address: "Địa điểm",
        type: 1
      },
    ]

    dataLoaction.forEach(async (l) => {
      if(l.nameHotel.includes(req.params.textLocation)){
        dataCompile.push(l)
      }
    })
    var regex = RegExp(".*" + req.params.textLocation + ".*");
    const dataHotel = await Hotel.find({ tinh: regex })
    dataHotel.forEach(async (item) => {
      const dataRespose = {
        idHotel: item._id,
        nameHotel: item.name,
        imageHotel: item.images[0],
        address: item.tinh + ", " + item.huyen + ", " + item.xa + ", " + item.sonha,
        type: 2
      }
      dataCompile.push(dataRespose)
    })

    res.status(200).json(dataCompile)
  } catch (error) {
    console.log(error)
    res.status(401).json({
      messege: false,
    })
  }
}
