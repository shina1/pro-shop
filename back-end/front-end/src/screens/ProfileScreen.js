import React,{useState, useEffect} from 'react'
import {Form, Button, Row,Col} from 'react-bootstrap'
import {useDispatch, useSelector} from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {userProfileAction, updateUserProfileAction } from '../actions/userActions'


const ProfileScreen = ({location, history}) => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [message, setMessage] = useState(null)

    const dispatch = useDispatch()
    const  userProfile = useSelector((state) => state.userProfile) 
    const {loading, error, user} =  userProfile;
    console.log(user);
    const  userLogin = useSelector((state) => state.userLogin)
    const {userInfo} = userLogin

    const  userProfileUpdate = useSelector((state) => state.userProfileUpdate)
    const {success} = userProfileUpdate
    

useEffect(() => {
    if(!userInfo){
        history.push('/login')
    }else {
        if(user.name){
            dispatch(userProfileAction('profile'))
    }
    else{
        setName(user.name)
        setEmail(user.email)
    }
    }
    
}, [dispatch, history, userInfo, user])

// for handling the submittion of form detials
const submitHandler = (e)=>{
    e.preventDefault()
    if(password !== confirmPassword){
        setMessage('Password does not match')
    }else{
        dispatch(updateUserProfileAction({id: user._id, name, email, password}))
    }
    
}

    return (
        <Row>
            <Col md={3}>
            <h2>Update Profile</h2>
            {message && <Message variant='danger'>{message}</Message>}
            {error && <Message variant='danger'>{error}</Message>}
            {success && <Message variant='success'>Profile Updated</Message>}
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
                <Button type='submit' variant='primary' className='my-3 rounded'>Update</Button>
            </Form>
            </Col>
            <Col md={9}>
                <h2>My Orders</h2>
            </Col>
        </Row>
    )
}

export default ProfileScreen
