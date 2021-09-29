import React, {useState,useEffect } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import { Row, Col, Card, Button, ListGroup, Image,Form } from "react-bootstrap";
import Ratings from "../components/Ratings";
import Loader from '../components/Loader'
import Message from '../components/Message'
import {productDetailsAction} from '../actions/productActions'
// import products from "../products";

const ProductScreen = ({history, match }) => {
  const [qty, setQty] = useState(1);
  const dispatch = useDispatch();

  const productDetails = useSelector(state =>state.productDetails)
  
  
  const {loading, error, product} =  productDetails 

  useEffect(() => {
    dispatch(productDetailsAction(match.params.id))
  }, [dispatch, match]);
  
  const addToCartHandler = () =>{
    history.push(`/cart/${match.params.id}?qty=${qty}`)
  }
 
  // const product = axios.get()
  // products.find((product) => product._id === match.params.id);
  return (
    <>
      <Link className="btn btn-dark my-3 br-5" to="/">
        Go Back
      </Link>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : (
           <Row>
           <Col md={6}>
             <Image src={product.image} alt={product.name} fluid />
           </Col>
           <Col md={3}>
             <ListGroup variant="flush">
               <ListGroup.Item className="br-t-10">
                 <h3>{product.name}</h3>
               </ListGroup.Item>
               <ListGroup.Item>
                 <strong className="l-bold">Description:</strong>
                 <p className="my-3">{product.description}</p>
               </ListGroup.Item>
               <ListGroup.Item>
                 <Ratings
                   value={product.rating}
                   text={`${product.numReviews} reviews`}
                 />
               </ListGroup.Item>
               <ListGroup.Item className="br-b-10">
                 <strong className="l-bold">Price </strong>: ${product.price}
               </ListGroup.Item>
             </ListGroup>
           </Col>
           <Col md={3}>
             <Card className="br-t-10">
               <ListGroup variant="flush">
                 <ListGroup.Item>
                   <Row>
                     <Col>Price:</Col>
                     <Col>
                       <strong>${product.price}</strong>
                     </Col>
                   </Row>
                 </ListGroup.Item>
                 <ListGroup.Item>
                   <Row>
                     <Col>Status:</Col>
                     <Col>
                       <strong>
                         {product.countInStock > 0 ? "In Stock" : "Out of Stock"}
                       </strong>
                     </Col>
                   </Row>
                 </ListGroup.Item>
                 {product.countInStock > 0 && (<ListGroup.Item>
                   <Row>
                     <Col>Qty</Col>
                     <Col>
                     <Form.Control as='select' value={qty} onChange={(e) => setQty(e.target.value)}>

                    {
                       [...Array(product.countInStock).keys()].map((x) => (
                        <option key={x + 1} value={x + 1}>
                         {x + 1}
                        </option>
                      ))
                    }
                     </Form.Control>
                     </Col>
                   </Row>
                   </ListGroup.Item>)}
                 <ListGroup.Item className="my-2 text-center">
                   <Button
                   onClick={addToCartHandler}
                     className="btn-block br-5 "
                     type="button"
                     disabled={product.countInStock === 0}
                   >
                     <i className="fas fa-shopping-cart px-2"></i>
                     Add To Cart
                   </Button>
                 </ListGroup.Item>
               </ListGroup>
             </Card>
           </Col>
         </Row>
      )}
   
    </>
  );
};

export default ProductScreen;
