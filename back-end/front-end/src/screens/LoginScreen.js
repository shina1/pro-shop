import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row,Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {loginUser} from '../actions/userActions'


const LoginScreen = ({location, history}) => {
 const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const redirect = location.search ? location.search.split('=')[1] : '/'

const dispatch = useDispatch()
const userLogin = useSelector(state => state.userLogin) 

const {loading, error, userInfo} = userLogin;

useEffect(() => {
    if(userInfo){
        history.push(redirect)
    }
}, [history, userInfo, redirect])

// for handling the submittion of form detials
const submitHandler = (e)=>{
    e.preventDefault()
    dispatch(loginUser(email, password))
}

    return (
        <FormContainer>
            <h1>Sign In</h1>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>
                        Email Address
                    </Form.Label>
                    <Form.Control type='email' placeholder='Enter email' value={email} onChange={(e)=> setEmail(e.target.value)}></Form.Control>
                </Form.Group>
                <Form.Group controlId='password'>
                    <Form.Label>
                        Password
                    </Form.Label>
                    <Form.Control type='password' placeholder='Enter passowrd' value={password}
                    onChange={(e)=> setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='my-3 rounded'>Sign In</Button>
            </Form>
            <Row className='py-3'>
                <Col xs={12} md={6}>
                    <h5>New Customer?<Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>Register</Link></h5>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen
