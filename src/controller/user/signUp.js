import user from '../../models/user'
const bcyrpt = require('bcrypt')
export const createUser = async (req, res) => {
  console.log(req.body)
  try {
    const checkEmail = await user.findOne({ email: req.body.email })
    if (checkEmail) {
      return res.status(400).json('email da ton tai!')
    }
    const passHass = bcyrpt.hashSync(req.body.password, 10)
    const dataUser = {
      name: '',
      phone: '',
      email: req.body.email,
      password: passHass,
      address: '',
      image: '',
      idcard: '',
    }
    const resault = await new user(dataUser).save()
    if (resault)
      res.status(200).json({
        messege: 'true',
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
