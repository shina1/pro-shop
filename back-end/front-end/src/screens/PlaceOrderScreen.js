import React,{useState} from 'react'
import {Link} from 'react-router-dom'
import { Button, Row, Col, Image, Card, ListGroup} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {placeOrderAction} from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const PlaceOrderScreen = () => {
   const cart = useSelector(state => state.cart)
//    calculate prices
const roundUpToDecimal = (num) =>{
    return (Math.round(num * 100) / 100).toFixed(2)
}
cart.itemPrice = roundUpToDecimal(cart.cartItems.reduce((a, i)=> a + i.price * i.qty, 0))

cart.shippingPrice = roundUpToDecimal(cart.itemPrice > 100 ? 0 : 100)
cart.taxPrice = roundUpToDecimal(Number((0.15 * cart.itemPrice).toFixed(2)))

cart.totalPrice = (Number(cart.itemPrice) + Number(cart.shippingPrice) + Number(cart.taxPrice)).toFixed(2)
   const placeOrderHandler = ()=>{
       console.log('place order');
   }
    return (
        <>
            <CheckoutSteps step1 step2 step3 step4/>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Address: </strong>
                                {cart.shippingAddress.address},
                                {cart.shippingAddress.city},
                                {cart.shippingAddress.postalcode},
                                {cart.shippingAddress.country}
                            </p>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <strong>Method: {cart.paymentMethod}</strong>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <h2>Order Items</h2>
                            {cart.cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go Back</Link></Message> : (
                                <ListGroup variant='flush'>
                                    {cart.cartItems.map((item,i) => 
                                        (
                                            <ListGroup.Item key={i}>
                                                <Row>
                                                    <Col md={2}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                                    </Col>
                                                    <Col>
                                                        <Link to={`product/${item.product}`}>
                                                        <p>$ {item.name}</p>
                                                        </Link>
                                                    </Col>
                                                    <Col md={4}>
                                                    <p> {item.qty} x ${item.price} = ${item.qty * item.price}
                                                    </p>
                                                    </Col>
                                                </Row>
                                            </ListGroup.Item>
                                        )
                                    )}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup>
                            <ListGroup.Item>
                                <h2>Order Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${cart.itemPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${cart.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${cart.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${cart.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button type='button' className='cst-btn btn-block btn-text' disabled={cart.cartItems.length === 0} onClick={placeOrderHandler}>Place Order</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default PlaceOrderScreen
