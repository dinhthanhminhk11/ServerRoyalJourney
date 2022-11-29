import user from '../../models/user'
const bcyrpt = require('bcrypt')
const config = require("../config/auth.config")

var jwt = require("jsonwebtoken");
export const loginUser = async (req, res) => {
  try {
    const checkEmail = await user.findOne({ email: req.body.email, role: 0 })
   
    if (!checkEmail) return res.status(200).json(
      {
        status: 'false',
        message: "Email chưa được đăng kí",
      }
    )
    const checkPass = bcyrpt.compareSync(req.body.password, checkEmail.password)
    if (!checkPass) return res.status(200).json({
      status: 'false',
      message: "Tài khoản hoặc mật khẩu không chính xác",
    })

    var token = jwt.sign({ id: checkEmail.id }, config.secret, {
      expiresIn: 86400 // 24 hours
    });

    res.status(200).json({
      status: 'true',
      message: "Đăng nhập thành công",
      data: {
        id: checkEmail.id,
        name: checkEmail.name,
        email: checkEmail.email,
        image: checkEmail.image,
        phone: checkEmail.phone,
        address: checkEmail.address,
        active : checkEmail.active,
        countBooking: checkEmail.countBooking,
        tokenDevice: checkEmail.tokenDevice
      },
      "accessToken" : token, 
      
    })
  } catch (error) {
    res.status(401).json({
      messege: 'false',
    })
  }
}
export const loginHost = async (req, res) => {
  try {
    const checkEmail = await user.findOne({ email: req.body.email })
    if (!checkEmail) return res.status(404).json('tài khoản chưa đăng ký!')
    const checkPass = bcyrpt.compareSync(req.body.password, checkEmail.password)
    if (!checkPass) return res.status(400).json('sai mật khẩu!')
    if (checkEmail.role != 1)
      return res.status(404).json('bạn ko có quyền đăng nhập hệ thống!')
    res.status(200).json({
      id: checkEmail._id,
      messege: 'true',
      name: checkEmail.name,
      image: checkEmail.image,
      role: 'host',
    })
  } catch (error) {
    res.status(401).json({
      messege: 'false',
    })
  }
}
export const loginAdmin = async (req, res) => {
  try {
    const checkEmail = await user.findOne({ email: req.body.email })
    if (!checkEmail) return res.status(404).json('tài khoản admin sai!')
    const checkPass = bcyrpt.compareSync(req.body.password, checkEmail.password)
    if (!checkPass) return res.status(400).json('sai mật khẩu!')
    res.status(200).json({
      messege: 'true',
      name: checkEmail.name,
      image: checkEmail.image,
      role: 'admin',
    })
  } catch (error) {
    res.status(401).json({
      messege: 'false',
    })
  }
}

export const isModerator = async (req, res, next) => {
  const checkEmail = await user.findById(req.userId)
  res.status(200).json({
    status: 'true',
    message: "Đăng nhập thành công",
    data: {
      id: checkEmail.id,
      name: checkEmail.name,
      email: checkEmail.email,
      image: checkEmail.image,
      phone: checkEmail.phone,
      address: checkEmail.address,
      countBooking: checkEmail.countBooking,
      tokenDevice: checkEmail.tokenDevice
    },
    "accessToken" : "token", 
  })
}

export const verifyToken = (req, res, next) => {
  let token = req.headers["x-access-token"];

  if (!token) {
    return res.status(403).send({ message: "No token provided!" });
  }

  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) {
      return res.status(401).send({ message: "Unauthorized!" });
    }
    req.userId = decoded.id;
    next();
  });
};
