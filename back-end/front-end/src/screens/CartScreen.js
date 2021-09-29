import React, {useEffect} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'
import {Row, Col, ListGroup, Image, Form, Button, Card} from 'react-bootstrap'
import Message from '../components/Message'
import {addToCart, removeItemFromCart} from '../actions/cartActions'


const CartScreen = ({match, location, history}) => {
    const productId = match.params.id;
    const qty = location.search ? Number( location.search.split('=')[1]) : 1
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)

    const {cartItems} = cart
    // console.log((cart));
    
    useEffect(() => {
        if(productId){
            dispatch(addToCart(productId,qty))
        }   
    }, [dispatch, productId, qty])
    // for deleting cart items
    const removeFromCartHandler = (id) => {
        dispatch(removeItemFromCart(id))
    }
    // for handling checkout button
    const checkOutHandler = () => {
      history.push('/login?redirect=shipping')  
    }

    return (
        <Row>
            <Col md={8}>
                <h1>Shopping Cart</h1> 
                {cartItems.length === 0 ? <Message>Your cart is empty <Link to='/'>Go Back</Link></Message> : (
                    <ListGroup variant='flush'>
                    {cartItems.map(cartItem => (
                        <ListGroup.Item key={cartItem.product} >
                       <Row>
                            <Col md={2}>
                            <Image src={cartItem.image} alt={cartItem.name} fluid rounded />
                            </Col>
                            <Col md={3}>
                            <Link to={`/produts/${cartItem.product}`}>
                            <h6>{cartItem.name}</h6>
                            </Link>
                            </Col>
                            <Col md={2}>
                            <small>${cartItem.price}</small>
                            </Col>
                            <Col md={3}>
                            <Form.Control as='select' value={cartItem.qty} onChange={(e) => dispatch(addToCart(cartItem.product, Number((e.target.value))))}>
                           {
                                [...Array(cartItem.countInStock).keys()].map(x => (
                                    <option key={x + 1} value ={x + 1}>
                                    {x + 1}
                                    </option>
                                ))
                           }
                            </Form.Control>
                            </Col>
                            <Col md={2}>
                                <Button type='button' variant='light' onClick={() =>removeFromCartHandler(cartItem.product)}> 
                                <i className='fas fa-trash'></i>
                                </Button>
                            </Col>
                       </Row>
                        </ListGroup.Item>
                    ))}
                    </ListGroup>
                )}
            </Col>
            <Col md={4}>
            <Card className='m-tp-2'>
                <ListGroup>
                    <ListGroup.Item>
                        <h2 className='sm-font'>
                        SUBTOTAL ({cartItems.reduce((acc, item) => (acc + item.qty), 0)}) ITEMS
                        </h2>
                        <p>
                            Total Price ${cartItems.reduce((acc, item) => (acc + item.qty * item.price),0).toFixed(2)}
                        </p>
                    </ListGroup.Item>
                    <ListGroup.Item>
                        <Button type='button' className='cst-btn btn-block btn-text' disabled={cartItems.length === 0} onClick={checkOutHandler}>
                        Proceed To CheckOut
                        </Button>
                    </ListGroup.Item>
                </ListGroup>
            </Card>
            </Col>
        </Row>
    )
}

export default CartScreen
