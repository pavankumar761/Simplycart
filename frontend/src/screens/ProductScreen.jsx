import {React,useState} from 'react';
import { useParams,useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { Form,Row,Col,Image,ListGroup,Card,Button, ListGroupItem} from 'react-bootstrap';
import Rating from "../components/Rating";
import { useGetProductDetailsQuery } from '../slices/productsApiSlice';
import Loader from '../components/Loader'
import {  useDispatch } from 'react-redux';
import Message from '../components/Message';
import { addToCart } from '../slices/cartSlice';
const ProductScreen=()=> {
    const dispatch=useDispatch();
    const navigate=useNavigate();
 const {id:productId}=useParams();
 const [qty,setQty]=useState();
 
 const{data:product,isLoading,error}=useGetProductDetailsQuery(productId);
 const addToCartHandler=()=>{
  dispatch(addToCart({...product,qty}));
  navigate('/cart');
 }
 

  return (
    <>
    <Link className='btn btn-light my-3' to='/'>Go Back</Link>
    {isLoading?(
       <Loader/>
    ):error ?(
        <Message variant="danger">{error?.data.message || error.error}</Message>
    ):(
        <Row>
        <Col md={5}>
            <Image src={product.image} lt={product.name} fluid/>
        </Col>
        <Col md={3}>
            <ListGroup variant='flush'>
                <ListGroupItem>
                    <h3>{product.name}</h3>
                </ListGroupItem>
                <ListGroupItem>
                    <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                </ListGroupItem>
                <ListGroupItem>Price:Rs.{product.price*85}</ListGroupItem>
                <ListGroupItem>About Product: {product.description}</ListGroupItem>
            </ListGroup>
        </Col>
        <Col md={3}>
            <Card>
                <ListGroup>
                    <ListGroupItem>
                        <Row>
                            <Col>Price:</Col>
                            <Col>
                            <strong>Rs.{product.price*85}</strong>
                            </Col>
                        </Row>
                    </ListGroupItem>
                    <ListGroupItem>
                        <Row>
                            <Col>Status:</Col>
                            <Col>
                            <strong>{product.countInStock > 0 ? 'Available' : 'Out of stock'}</strong>
                            </Col>
                        </Row>
                    </ListGroupItem>
                    { product.countInStock>0 && 
                    (<ListGroup.Item>
                        <Row>
                            <Col>Qty</Col>
                            <Col>
                            <Form.Control as='select' value={qty} onChane={(e)=> setQty(Number(e.target.value))}>
{[...Array(product.countInStock).keys()].map((x)=>(
    <option key={x+1} value={x+1}>
    {x+1}
    </option>
))}
                            </Form.Control>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    ) }
                    <ListGroupItem>
                        <Button className='btn-block' type='button' disabled={product.countInStock===0}
                        onClick={addToCartHandler}>
                         Add to cart
                        </Button>
                    </ListGroupItem>
                </ListGroup>
            </Card>
        </Col>
    </Row>
    )}
    
    </>
  )
}

export default ProductScreen