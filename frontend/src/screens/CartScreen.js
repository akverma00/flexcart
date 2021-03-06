import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import {
    addToCart,
    removeFromCart
} from '../actions/cartActions';

export default function CartScreen(props) {
    // eslint-disable-next-line react/prop-types
    const productId = props.match.params.id;
    // eslint-disable-next-line react/prop-types
    const qty = props.location.search
        // eslint-disable-next-line react/prop-types
        ? Number(props.location.search.split('=')[1])
        : 1;

    const cart = useSelector(state => state.cart);
    const { cartItems } = cart;

    const dispatch = useDispatch();
    useEffect(() => {
        if (productId) {
            dispatch(addToCart(productId, qty));
        }
    }, [dispatch, productId, qty])
    const removeFromCartHandler = (id) => {
        dispatch(removeFromCart(id));
    }
    const checkoutHandler = () => {
        // eslint-disable-next-line react/prop-types
        props.history.push('/signin?redirect=shipping')
    }
    return (
        <div className="row top">
            <div className="col-2">
                <h1>
                    Shopping Cart
                </h1>
                {
                    cartItems.length === 0 ? (<MessageBox>
                        Cart is Empty. <Link to="/">Go Shopping</Link>
                    </MessageBox>
                    ) : (
                        <ul>
                            {
                                cartItems.map((item) => (
                                    <li key={item.product}>
                                        <div className="row">
                                            <div>
                                                <img className="small" src={item.image} alt={item.name} />
                                            </div>
                                            <div className="min-30">
                                                <Link to={`/product/${item.product}`} >{item.name} </Link>
                                            </div>
                                            <div>
                                                <select
                                                    value={item.qty}
                                                    onChange={(e) =>
                                                        dispatch(
                                                            addToCart(item.product,
                                                                Number(e.target.value)
                                                            ))
                                                    }
                                                >
                                                    {
                                                        [...Array(item.countInStock).keys()].map(
                                                            (x) => (
                                                                <option key={x + 1} value={x + 1}>
                                                                    {x + 1}
                                                                </option>
                                                            )
                                                        )}
                                                </select>
                                            </div>
                                            <div>${item.price} </div>
                                            <div>

                                                <button
                                                    onClick={() => removeFromCartHandler(item.product)}
                                                    type="button" >
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                ))
                            }
                        </ul>
                    )
                }
            </div>
            <div className="col-1">
                <div className="card card-body">
                    <ul>
                        <li>
                            <h2>
                                SubTotal ({cartItems.reduce((accumulater, item) => accumulater + item.qty, 0)} items)
                            : ${cartItems.reduce((accumulater, item) => accumulater + item.price * item.qty, 0)}
                            </h2>
                        </li>
                        <li>
                            <button
                                type="button"
                                onClick={checkoutHandler}
                                className="primary block"
                                disabled={cartItems.length === 0}
                            >
                                Proceed to Checkout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </div >
    )
}
