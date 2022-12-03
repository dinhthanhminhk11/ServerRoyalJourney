import order from "../../models/order";

const start = new Date()
const end = new Date()
start.setHours(0, 0, 0, 0)
end.setHours(23, 59, 59, 999)
const curr = new Date()
const first = new Date(curr.setDate(curr.getDate()+2 - curr.getDay()));
first.setHours(0,0,0,0)
const last = new Date(curr.setDate(curr.getDate() - curr.getDay()+7));
last.setHours(23,59,59,999)

const firstMonth = new Date(curr.getFullYear(), curr.getMonth(), 2);
firstMonth.setHours(0,0,0,0)
const lastMonth = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
lastMonth.setHours(23,59,59,999)


const firstYear = new Date(curr.getFullYear(),0,2);
firstYear.setHours(0,0,0,0)
const lastYear= new Date(curr.getFullYear(),12,0);
lastYear.setHours(23,59,59,999)

const a = Date.parse(start.toString())
const b = Date.parse(end.toString())
export const totalOrder = async (req, res) => {
    try {
        const data = await order.count({IdHost: req.params.IdHost})
        res.json({
            data
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}
export const totalOrderFinish = async (req, res) => {
    try {
        const data = await order.count({IdHost: req.params.IdHost, status: 'Đã trả phòng'})
        res.json({
            data
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}
export const totalOrderProcess = async (req, res) => {
    try {
        const data = await order.count({
            IdHost: req.params.IdHost,
            status: {$in: ['Đang chờ', 'Đã xác nhận']}
        })
        res.json({
            data
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}
export const totalOrderFail = async (req, res) => {
    try {
        const data = await order.count({
            IdHost: req.params.IdHost,
            status: {$in: ['Chủ đã huỷ', 'Khách huỷ']}
        })
        res.json({
            data
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}
export const getCountTimeOrder = async (req, res) => {
    try {
        const data = await order.find({
            IdHost: req.params.IdHost,
            createdAt:
                {
                    $gte: a,
                    $lt: b
                }
        }).count()
        res.json({
            data
        })

    } catch (error) {
        res.status(400).json({
            error
        })
    }
}

export const getPriceDayOrder = async (req, res) => {
    try {
        const data = await order.find({
            IdHost: req.params.IdHost,
            status: 'Đã trả phòng',
            createdAt: {$gte: a, $lt: b}
        },{price:1})
        res.json({
            data
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}

export const getPriceWeekOrder = async (req, res) => {
    try {
        const aWeek = Date.parse(first.toString())
        const bWeek = Date.parse(last.toString())
        const data = await order.find({
            IdHost: req.params.IdHost,
            status: 'Đã trả phòng',
            createdAt: {$gte: aWeek, $lt: bWeek}
        },{price:1})
        res.json({
            data
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}

export const getPriceMonthOrder = async (req, res) => {
    try {
        const aMonth = Date.parse(firstMonth.toString())
        const bMonth = Date.parse(lastMonth.toString())
        const data = await order.find({
            IdHost: req.params.IdHost,
            status: 'Đã trả phòng',
            createdAt: {$gte: aMonth, $lt: bMonth}
        },{price:1})
        res.json({
            data
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}

export const getPriceYearOrder = async (req, res) => {
    try {
        const aYear = Date.parse(firstYear.toString())
        const bYear = Date.parse(lastYear.toString())
        const data = await order.find({
            IdHost: req.params.IdHost,
            status: 'Đã trả phòng',
            createdAt: {$gte: aYear, $lt: bYear}
        },{price:1})
        res.json({
            data
        })
    } catch (error) {
        res.status(400).json({
            error
        })
    }
}

export const getPriceOrder= async (req, res) => {
    try {
        const data = await order.find({
            IdHost: req.params.IdHost,
            status: 'Đã trả phòng',
            createdAt: {$gte: Date.parse(req.params.startDay), $lt: Date.parse(req.params.endDay)}
        },{price:1})
        res.json({
            data
        })

    } catch (error) {
        res.status(400).json({
            error
        })
    }
}

export const getPriceOrderWaiting= async (req, res) => {
    try {
        const data = await order.find({
            IdHost: req.params.IdHost,
            status: 'Đang chờ',
        },{price:1})
        res.json({
            data
        })

    } catch (error) {
        res.status(400).json({
            error
        })
    }
}
