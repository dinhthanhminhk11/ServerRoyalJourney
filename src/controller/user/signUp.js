import user from '../../models/user'
const bcyrpt = require('bcrypt')
const { generateOTP } = require('../../services/OTP');
const { sendMail } = require('../../services/MAIL');
export const createUser = async (req, res) => {
  console.log(req.body)
  const otpGenerated = generateOTP();
  try {
    const checkEmail = await user.findOne({ email: req.body.email , role: 0 })
    if (checkEmail) {
      return res.status(400).json({
        status: "false",
        message: 'Email đã tồn tại',
        email: checkEmail.email,
      })
    }
    const passHass = bcyrpt.hashSync(req.body.password, 10)
    const dataUser = {
      name: req.body.name   ,
      phone: '',
      email: req.body.email,
      password: passHass,
      address: '',
      image: '',
      idcard: '',
      "otp": otpGenerated,
      "active" : false
    }
    const resault = await new user(dataUser).save()
    await sendMail({
      to: req.body.email,
      OTP: otpGenerated,
    });
    if (resault)
      res.status(200).json({
        status: "true",
        message: 'Đăng kí thành công',
        email: dataUser.email,
      })
  } catch (error) {
    res.status(400).json({
      messege: 'false',
    })
  }
}
export const createHost = async (req, res) => {
  console.log(req.body)
  try {
    const checkEmail = await user.findOne({ email: req.body.email })
    if (checkEmail) {
      return res.status(400).json('email host đã tồn tại!')
    }
    const passHass = bcyrpt.hashSync(req.body.password, 10)
    const dataHost = {
      name: req.body.name,
      phone: req.body.phone,
      email: req.body.email,
      password: passHass,
      address: req.body.address,
      image: req.body.image,
      idcard: req.body.idcard,
      role: 1,
    }
    const resault = await new user(dataHost).save()
    if (resault)
      res.status(200).json({
        messege: 'true',
        email: dataHost.email,
        role: 'host',
      })
  } catch (error) {
    res.status(400).json({
      messege: 'false',
    })
  }
}

export const verifyEmail = async (req, res) => {
  const { email, otp } = req.body;
  const user = await validateUserSignUp(email, otp);
  res.send(user);
};

const validateUserSignUp = async (email, otp) => {
  const userData = await user.findOne({
    email,
  });
  if (!userData) {
    return {"status" : false , "message" : "Email không tồn tại"};
  }
  if (userData && userData.otp !== otp) {
    return {"status" : false , "message" : "OTP không chính xác"};
  }
  const updatedUser = await user.findByIdAndUpdate(userData._id, {
    $set: { active: true },
  });
  return {"status" : true , "message" : "Đã xác nhận email" , "data": updatedUser};
};

export const sendAgain = async (req, res) => {
  try {
    const checkEmail = await user.findOne({ email: req.body.email , role: 0 })
    await sendMail({
      to: req.body.email,
      OTP: checkEmail.otp,
    });

    res.status(200).json({
      status: true,
      message: 'Đã gửi tới'
    })
  } catch (error) {
    res.status(400).json({
      status: false,
      message: 'Mail chưa được đăng kí',
    })
  }
}