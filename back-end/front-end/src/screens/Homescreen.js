import React, { useEffect } from "react";
import {useDispatch,useSelector} from "react-redux";
import {Row, Col} from 'react-bootstrap'
// import products from "../products";
import Products from "../components/Product";
import Loader from '../components/Loader';
import Message from '../components/Message';
import {productListAction} from '../actions/productActions';

const Homescreen = () => {
 const dispatch = useDispatch()
 const productList = useSelector(state => state.productList)
 const {loading, error, products} = productList;
  useEffect(() => {
  dispatch(productListAction())
  }, [dispatch]);
  
  return (
    <>
      <h1 className="text-center my-3">Latest Products</h1>
      {loading ? <Loader /> : error ? <Message variant='danger'>{error}</Message> : <Row>
        {products.map((product) => (
          <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
            <Products product={product} />
          </Col>
        ))}
      </Row>}
      
    </>
  );
};

export default Homescreen;
