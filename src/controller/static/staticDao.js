import order from "../../models/order";


export const totalOrder = async (req, res) =>{
    try {
        const data = await order.count({IdHost: req.params.IdHost})
        res.json({
            data
        })
    }catch (error) {
        res.status(400).json({
            error
        })
    }
}
export const totalOrderFinish = async (req, res) =>{
    try {
        const data = await order.count({IdHost: req.params.IdHost, status:'Đã trả phòng'})
        res.json({
            data
        })
    }catch (error) {
        res.status(400).json({
            error
        })
    }
}
export const totalOrderProcess = async (req, res) =>{
    try {
        const data = await order.count({
            IdHost: req.params.IdHost,
            status: {$in:['Đang chờ','Đã xác nhận']}})
        res.json({
            data
        })
    }catch (error) {
        res.status(400).json({
            error
        })
    }
}
export const totalOrderFail = async (req, res) =>{
    try {
        const data = await order.count({
            IdHost: req.params.IdHost,
            status: {$in:['Chủ đã huỷ','Khách huỷ']}
        })
        res.json({
            data
        })
    }catch (error) {
        res.status(400).json({
            error
        })
    }
}
export const getTimeOrder = async (req, res) =>{
    try {
       const data = await order.find({IdHost: req.params.IdHost}, {createdAt:1})
        res.json({
            data
        })
    }catch (error) {
        res.status(400).json({
            error
        })
    }
}
