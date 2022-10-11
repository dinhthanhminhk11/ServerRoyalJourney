import user from '../../models/user'
const bcyrpt = require('bcrypt')
export const loginUser = async (req, res) => {
  try {
    const checkEmail = await user.findOne({ email: req.body.email })
    if (!checkEmail) return res.status(404).json(
      {
        status: 'false',
        message: "Email chưa được đăng kí",
      }
    )
    const checkPass = bcyrpt.compareSync(req.body.password, checkEmail.password)
    if (!checkPass) return res.status(400).json({
      status: 'false',
      message: "Tài khoản hoặc mật khẩu không chính xác",
    })
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
      }
      
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
    res.status(200).json({
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
