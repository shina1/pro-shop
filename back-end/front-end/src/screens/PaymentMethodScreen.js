import React,{useState} from 'react'
import {Form, Button, Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import FormContainer from '../components/FormContainer'
import {savePaymentMethodAction} from '../actions/cartActions'
import CheckoutSteps from '../components/CheckoutSteps'

const PaymentMethodScreen = ({history}) => {
    const dispatch = useDispatch()
    const cart = useSelector(state => state.cart)
    const {shippingAddress} = cart
    if(!shippingAddress){
        history.push('/shipping')
    }
    const [paymentMethod, setPaymentMethod] = useState('paypal')
    const submitHandler = (e) =>{
        e.preventDefault()
        dispatch(savePaymentMethodAction(paymentMethod))
        history.push('/placeorder')
    }
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h1>Payment Method</h1>
            <Form onSubmit={submitHandler}>
                <Form.Group>
                    <Form.Label as='legend'>Select Method</Form.Label>
                    <Col sm={12} md={6} lg={4} xl={3}>
                    <Form.Check
                    type='radio'
                    label='paypal or Credit Card'
                    id='paypal'
                    name='paymentMethod'
                    value='paypal'
                    checked
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    >
                    </Form.Check>
                    <Form.Check
                    type='radio'
                    label='Stripe'
                    id='stripe'
                    name='paymentMethod'
                    value='stripe'
                    onChange={(e)=> setPaymentMethod(e.target.value)}
                    >
                    </Form.Check>
                    <Form.Check
                    type='radio'
                    label='Paystack'
                    id='paystack'
                    name='paymentMethod'
                    value='paystack'
                    onChange={(e)=> setPaymentMethod(e.target.value)}
                    >
                    </Form.Check>
                </Col>
                </Form.Group>
                
                
                <Button type='submit' variant='primary' className='my-3 rounded'>Proceed</Button>
            </Form>
        </FormContainer>
    )
}

export default PaymentMethodScreen
