import React,{useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import {Form, Button, Row,Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {registerAction} from '../actions/userActions'


const RegisterScreen = ({location, history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const redirect = location.search ? location.search.split('=')[1] : '/'

    const dispatch = useDispatch()
    const  userRegister = useSelector(state => state.userRegister) 

    const {loading, error, userInfo} =  userRegister;

useEffect(() => {
    if(userInfo){
        history.push(redirect)
    }
}, [history, userInfo, redirect])

// for handling the submittion of form detials
const submitHandler = (e)=>{
    e.preventDefault()
    if(password !== confirmPassword){
        setMessage('Password does not match')
    }else{
        dispatch(registerAction(name, email, password))
    }
    
}

    return (
        <FormContainer>
            <h1>Sign Up</h1>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <Loader/>}
            <Form onSubmit={submitHandler}>
            <Form.Group controlId='name'>
                    <Form.Label>
                        User Name
                    </Form.Label>
                    <Form.Control type='text' placeholder='Enter username' value={name} onChange={(e)=> setName(e.target.value)}></Form.Control>
                </Form.Group>
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
                <Form.Group controlId='confirmPassword'>
                    <Form.Label>
                        Confirm Password
                    </Form.Label>
                    <Form.Control type='password' placeholder='Confirm passowrd' value={confirmPassword}
                    onChange={(e)=> setConfirmPassword(e.target.value)}
                    >
                    </Form.Control>
                </Form.Group>
                <Button type='submit' variant='primary' className='my-3 rounded'>Sign Up</Button>
            </Form>
            <Row className='py-3'>
                <Col xs={12} md={6}>
                    <h5>Have an account?<Link to={redirect ? `/login?redirect=${redirect}` : '/login'}>Sign In</Link></h5>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default RegisterScreen
