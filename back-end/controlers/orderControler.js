import asyncHandler from 'express-async-handler'
import Order from '../modules/orderModule.js'


// @desc Create new Order
//  @route Post/api/orders
// @access Private

const addOrderItems = asyncHandler(async(req, res) =>{
    const {orderItmes, shippingAddress, paymentMethod, itemPrice, taxPrice,shippingPrice,totalPrice} = req.body

    if(orderItmes && orderItmes.length === 0){
        res.status(400)
        throw new Error('No order item')
        return
    }else{
        const order = new Order({
            orderItmes,
            user: req.user._id,
            shippingAddress,
            paymentMethod,
            itemPrice,
            taxPrice,
            shippingPrice,
            totalPrice
        })

        const createdOrder = await order.save()
        res.status(201).json(createdOrder)
    }
})

// @desc Get order by id
//  @route GET /api/orders/${id}
// @access Private
const getOrderByID = asyncHandler(async(req, res) =>{
    const order = await Order.findById(req.params.id).populate('user', 'name email')

    if(order){
        res.json({order})
    }else{
        res.status(404)
        throw new Error('no order found')
    }
})

export{
    addOrderItems,
    getOrderByID,
}