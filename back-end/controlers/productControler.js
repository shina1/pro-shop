import asyncHandler from 'express-async-handler'
import Product from'../modules/productModule.js'

// @desc     Fetch all product
// @route    GET /api/products
// @access   Public

const getProduct = asyncHandler( async(requestAnimationFrame, res) => {
    const products = await Product.find({});
    return res.status(200).json({
        status: "success",
        products,
      });
})

// @desc     Fetch single product
// @route    GET /api/products/:id
// @access   Public

const getProductById = asyncHandler( async(req, res)=>{
 const product = await Product.findById(req.params.id)
 
 if (product) {
    return res.status(200).json({
      status: "success",
      product,
    });
  } else {
    return res.status(404);
    throw new error('Product not found')
  }
})

export{
    getProduct,
    getProductById
}