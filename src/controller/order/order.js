import user from '../../models/user'
import order from '../../models/order'
import product from '../../models/product'
import noti from '../../models/Noti'
import { response } from 'express'
const { sendMailComfirmBooking } = require('../../services/MAIL');
const { sendMailCheckOut, sendMailComfirmCancelByUser, sendMailComfirmCancelByHost } = require('../../services/MAIL');
var FCM = require('fcm-node')

const Server_key = 'AAAAXdg_118:APA91bEVZLvJ2g1mgi--7RqdkknlLqy9g-9VpsoAY2Ve8n9xd2tyMV2Ag-4V-OA6fPnTYZFXGur3nMd-qX7xdN2ryE0n4KvnngC-eUw7hsUMZQf6uWWNeIUN_v2cIDE64Pk_Hv88n7I6'

var fcm = new FCM(Server_key);

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
      { IdOder: req.body.id },
      { status: req.body.status, seem: true, reasonHost: req.body.reasonHost, isSuccess: true },
      { new: true }
    )

    const dataProductUpdate = await product.findOneAndUpdate(
      { _id: dataUpdate.IdPro },
      { isStillEmpty: true },
      { new: true }
    )

    const dataOrderMutil = await order.updateMany({
      status: 'Đang chờ',
      IdPro: dataUpdate.IdPro
    }, {
      $set: {
        status: "Chủ đã huỷ", seem: true, reasonHost: "Hết Phòng"
      }
    }
    )

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
      { isCancellationDate: true, seem: true },
      { new: true }
    )
    const dataProductUpdate = await product.findOneAndUpdate(
      { _id: dataUpdate.IdPro },
      { isStillEmpty: false },
      { new: true }
    )
    const dataUser = await user.findOneAndUpdate(
      { _id: dataUpdate.IdUser },
      { countBooking: userUpdate.countBooking -= 1 },
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
      IdOder: req.body.id
    })
    const dataUser = await user.findOne({
      _id: dataOrder.IdUser
    })

    const dataProduct = await product.findOne({
      _id: dataOrder.IdPro
    })
    var message = {
      to: dataUser.tokenDevice,
      data: { //you can send only notification or only data(or include both)
        title: 'Xác nhận phòng',
        body: 'Yêu cầu đặt phòng của bạn đã được ' + dataProduct.name + ' chấp nhận',
        idOder: dataOrder.IdOder,
        image: dataProduct.images[0]
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

export const senNotificationCancel = async (req, res) => {
  try {
    const dataOrder = await order.findOne({
      IdOder: req.body.id
    })
    const dataUser = await user.findOne({
      _id: dataOrder.IdUser
    })

    const dataProduct = await product.findOne({
      _id: dataOrder.IdPro
    })
    var message = {
      to: dataUser.tokenDevice,
      data: { //you can send only notification or only data(or include both)
        title: 'Yêu cầu không được chấp nhận',
        body: 'Chủ phòng ' + dataProduct.name + ' đã từ chối bạn. Lí do: "' + req.body.reasonHost + '"',
        idOder: dataOrder.IdOder,
        image: dataProduct.images[0]
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

export const senNotificationRequestCancel = async (req, res) => {
  try {
    const dataOrder = await order.findOne({
      IdOder: req.body.id
    })
    const dataUser = await user.findOne({
      _id: dataOrder.IdUser
    })

    const dataProduct = await product.findOne({
      _id: dataOrder.IdPro
    })
    var message = {
      to: dataUser.tokenDevice,
      data: { //you can send only notification or only data(or include both)
        title: 'Xác nhận huỷ phòng',
        body: 'Chủ phòng ' + dataProduct.name + ' đã chấp nhận yêu cầu huỷ phòng của bạn',
        idOder: dataOrder.IdOder,
        image: dataProduct.images[0]
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

export const senMailnAccess = async (req, res) => {
  try {
    const dataOrder = await order.findOne({
      IdOder: req.body.id
    })
    const dataUser = await user.findOne({
      _id: dataOrder.IdUser
    })

    const dataHost = await user.findOne({
      _id: dataOrder.IdHost
    })

    const dataProduct = await product.findOne({
      _id: dataOrder.IdPro
    })

    await sendMailComfirmBooking({
      to: dataUser.email,
      phone: dataOrder.phone,
      nameUser: dataUser.name,
      endDate: dataOrder.endDate,
      startDate: dataOrder.startDate,
      countDay: dataOrder.payDay,
      countPerson: dataOrder.person,
      namePro: dataProduct.name,
      address: dataProduct.nameLocation,
      nameHost: dataHost.name,
      image1: dataProduct.images[0],
      image3: dataProduct.images[3],
      image2: dataProduct.images[2],
      image4: dataProduct.images[4],
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
      { IdOder: req.body.id },
      { checkedOut: true, status: 'Đã trả phòng' },
      { new: true }
    )

    const userUpdate = await user.findById({ _id: dataUpdate.IdUser })

    const dataUser = await user.findOneAndUpdate(
      { _id: dataUpdate.IdUser },
      { countBooking: userUpdate.countBooking += 1 },
      { new: true }
    )

    const dataProduct = await product.findOneAndUpdate(
      { _id: dataUpdate.IdPro },
      { isStillEmpty: false },
      { new: true }
    )

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
      IdOder: req.body.id
    })
    const dataUser = await user.findOne({
      _id: dataOrder.IdUser
    })

    const dataProduct = await product.findOne({
      _id: dataOrder.IdPro
    })
    var message = {
      to: dataUser.tokenDevice,
      data: { //you can send only notification or only data(or include both)
        title: 'Hoàn tất',
        body: 'Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi, Chủ phòng ' + dataProduct.name + ' ý kiến của bạn sẽ là động lực cho chúng tôi phát triển và hoàn thiện hơn',
        idOder: dataOrder.IdOder,
        image: dataProduct.images[0]
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
      IdOder: req.body.id
    })
    const dataUser = await user.findOne({
      _id: dataOrder.IdUser
    })

    const dataHost = await user.findOne({
      _id: dataOrder.IdHost
    })

    const dataProduct = await product.findOne({
      _id: dataOrder.IdPro
    })

    await sendMailCheckOut({
      to: dataUser.email,
      phone: dataOrder.phone,
      nameUser: dataUser.name,
      endDate: dataOrder.endDate,
      startDate: dataOrder.startDate,
      countDay: dataOrder.payDay,
      countPerson: dataOrder.person,
      namePro: dataProduct.name,
      address: dataProduct.nameLocation,
      nameHost: dataHost.name,
      image1: dataProduct.images[0],
      image3: dataProduct.images[3],
      image2: dataProduct.images[2],
      image4: dataProduct.images[4],
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
      IdOder: req.body.id
    })
    const dataUser = await user.findOne({
      _id: dataOrder.IdUser
    })

    const dataHost = await user.findOne({
      _id: dataOrder.IdHost
    })

    const dataProduct = await product.findOne({
      _id: dataOrder.IdPro
    })

    await sendMailComfirmCancelByUser({
      to: dataUser.email,
      phone: dataOrder.phone,
      nameUser: dataUser.name,
      endDate: dataOrder.endDate,
      startDate: dataOrder.startDate,
      countDay: dataOrder.payDay,
      countPerson: dataOrder.person,
      namePro: dataProduct.name,
      address: dataProduct.nameLocation,
      nameHost: dataHost.name,
      image1: dataProduct.images[0],
      image3: dataProduct.images[3],
      image2: dataProduct.images[2],
      image4: dataProduct.images[4],
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
      IdOder: req.body.id
    })
    const dataUser = await user.findOne({
      _id: dataOrder.IdUser
    })

    const dataHost = await user.findOne({
      _id: dataOrder.IdHost
    })

    const dataProduct = await product.findOne({
      _id: dataOrder.IdPro
    })

    await sendMailComfirmCancelByHost({
      to: dataUser.email,
      phone: dataOrder.phone,
      nameUser: dataUser.name,
      endDate: dataOrder.endDate,
      startDate: dataOrder.startDate,
      countDay: dataOrder.payDay,
      countPerson: dataOrder.person,
      namePro: dataProduct.name,
      address: dataProduct.nameLocation,
      nameHost: dataHost.name,
      image1: dataProduct.images[0],
      image3: dataProduct.images[3],
      image2: dataProduct.images[2],
      image4: dataProduct.images[4],
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
      IdOder: req.body.id
    })

    const dataProduct = await product.findOne({
      _id: dataOrder.IdPro
    })

    const dataNewNoti = {
      idOder: dataOrder.IdOder,
      idUser: dataOrder.IdUser,
      title: 'Xác nhận phòng',
      content: 'Yêu cầu đặt phòng của bạn đã được ' + dataProduct.name + ' chấp nhận',
      imageHoust: dataProduct.images[0],
      date: date + "/" + month + "/" + year,
      time: hours + ":" + minutes + ":" + seconds
    }
    const saveOrder = await new noti(dataNewNoti).save()
    res.status(200).json({
      messege: true,
      data: saveOrder
    })

  } catch (error) {
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
      IdOder: req.body.id
    })

    const dataProduct = await product.findOne({
      _id: dataOrder.IdPro
    })

    const dataNewNoti = {
      idOder: dataOrder.IdOder,
      idUser: dataOrder.IdUser,
      title: 'Yêu cầu không được chấp nhận',
      content: 'Chủ phòng ' + dataProduct.name + ' đã từ chối bạn. Lí do: "' + req.body.reasonHost + '"',
      imageHoust: dataProduct.images[0],
      date: date + "/" + month + "/" + year,
      time: hours + ":" + minutes + ":" + seconds
    }
    const saveOrder = await new noti(dataNewNoti).save()
    res.status(200).json({
      messege: true,
      data: saveOrder
    })

  } catch (error) {
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
      IdOder: req.body.id
    })

    const dataProduct = await product.findOne({
      _id: dataOrder.IdPro
    })

    const dataNewNoti = {
      idOder: dataOrder.IdOder,
      idUser: dataOrder.IdUser,
      title: 'Xác nhận huỷ phòng',
      content: 'Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi, Chủ phòng ' + dataProduct.name + ' ý kiến của bạn sẽ là động lực cho chúng tôi phát triển và hoàn thiện hơn',
      imageHoust: dataProduct.images[0],
      date: date + "/" + month + "/" + year,
      time: hours + ":" + minutes + ":" + seconds
    }
    const saveOrder = await new noti(dataNewNoti).save()
    res.status(200).json({
      messege: true,
      data: saveOrder
    })

  } catch (error) {
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
      IdOder: req.body.id
    })

    const dataProduct = await product.findOne({
      _id: dataOrder.IdPro
    })

    const dataNewNoti = {
      idOder: dataOrder.IdOder,
      idUser: dataOrder.IdUser,
      title: 'Hoàn tất',
      content: 'Cảm ơn bạn đã tin tưởng và sử dụng dịch vụ của chúng tôi, Chủ phòng ' + dataProduct.name + ' ý kiến của bạn sẽ là động lực cho chúng tôi phát triển và hoàn thiện hơn',
      imageHoust: dataProduct.images[0],
      date: date + "/" + month + "/" + year,
      time: hours + ":" + minutes + ":" + seconds
    }
    const saveOrder = await new noti(dataNewNoti).save()
    res.status(200).json({
      messege: true,
      data: saveOrder
    })

  } catch (error) {
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
