import order from "../../models/order";

const start = new Date()
const end = new Date()
start.setUTCHours(0, 0, 0, 0)
end.setUTCHours(23, 59, 59, 999)

const startAfter = new Date()
const endAfter = new Date()
startAfter.setUTCHours(0, 0, 0, 0)
endAfter.setUTCHours(23, 59, 59, 999)
startAfter.setDate(startAfter.getDate()-1)
endAfter.setDate(endAfter.getDate()-1)


const curr = new Date()
const firstMonth = new Date(curr.getFullYear(), curr.getMonth(), 2);
firstMonth.setUTCHours(0,0,0,0)
const lastMonth = new Date(curr.getFullYear(), curr.getMonth() + 1, 0);
lastMonth.setUTCHours(23,59,59,999)


const firstYear = new Date(curr.getFullYear(),0,2);
firstYear.setUTCHours(0,0,0,0)
const lastYear= new Date(curr.getFullYear(),12,0);
lastYear.setUTCHours(23,59,59,999)

const a = Date.parse(start.toString())
const b = Date.parse(end.toString())


const dt = new Date();  //current date of week
const currentWeekDay = dt.getDay();
const lessDays = currentWeekDay === 0 ? 6 : currentWeekDay - 1;
const wkStart = new Date(new Date(dt).setDate(dt.getDate() - lessDays));
wkStart.setUTCHours(0,0,0,0)
const wkEnd = new Date(new Date(wkStart).setDate(wkStart.getDate() + 6));
wkEnd.setUTCHours(23,59,99,999)
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

export const getPriceLastDayOrder = async (req, res) => {
    try {
        const data = await order.find({
            IdHost: req.params.IdHost,
            status: 'Đã trả phòng',
            createdAt: {$gte: Date.parse(startAfter), $lt: Date.parse(endAfter)}
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
        const aWeek = Date.parse(wkStart.toString())
        const bWeek = Date.parse(wkEnd.toString())
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
    //2022-12-04
    try {
        let startDate= new Date(req.params.startDay)
        startDate.setUTCHours(0,0,0,0)
        let endDate= new Date(req.params.endDay)
        endDate.setUTCHours(23,59,59,999)
        const data = await order.find({
            IdHost: req.params.IdHost,
            status: 'Đã trả phòng',
            createdAt: {$gte: Date.parse(startDate), $lt: Date.parse(endDate)}
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
