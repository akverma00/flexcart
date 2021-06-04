import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CheckoutSteps from '../components/CheckoutSteps';

export default function PlaceOrderScreen(props) {

    const cart = useSelector(state => state.cart);
    if (!cart.paymentMethod) {
        // eslint-disable-next-line react/prop-types
        props.history.push('/payment');
    }

    const toPrice = (num) => Number(num.toFixed(2));
    cart.itemsPrice = toPrice(
        cart.cartItems.reduce(
            (acc, item) => acc + item.price * item.qty,
            0)
    );
    cart.shippingPrice = cart.itemsPrice > 100 ? toPrice(0) : 10;
    cart.taxPrice = toPrice(0.15 * cart.itemsPrice);
    cart.totalPrice = cart.itemsPrice + cart.shippingPrice + cart.taxPrice;


    const placeOrderHandler = () => {
        // eslint-disable-next-line react/prop-types
        props.history.push('/')
    }

    return (
        <div>
            <CheckoutSteps step1 step2 step3 step4 />
            <div className="row top">
                <div className="col-2">
                    <ul>
                        <li>
                            <div className="card card-body">
                                <h2>Shipping </h2>
                                <p>
                                    <strong>Name:</strong>{cart.shippingAddress.fullName} <br />
                                    <strong>Address:</strong>{cart.shippingAddress.address},
                                    {cart.shippingAddress.city} ,
                                    {cart.shippingAddress.postalCode},
                                    {cart.shippingAddress.country} <br />
                                </p>

                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h1>Payment</h1>
                                <p>
                                    <strong>Payment Method:</strong>{cart.paymentMethod}
                                </p>
                            </div>
                        </li>
                        <li>
                            <div className="card card-body">
                                <h2>Order Items</h2>
                                <ul>
                                    {
                                        cart.cartItems.map((item) => (
                                            <li key={item.product}>
                                                <div className="row">
                                                    <div>
                                                        <img
                                                            className="small"
                                                            src={item.image}
                                                            alt={item.name} />
                                                    </div>
                                                    <div className="min-30">
                                                        <Link to={`/product/${item.product}`} >{item.name} </Link>
                                                    </div>
                                                    <div>
                                                        {item.qty} x ${item.price} = ${item.qty * item.price}
                                                    </div>

                                                </div>
                                            </li>
                                        ))
                                    }
                                </ul>

                            </div>
                        </li>
                    </ul>
                </div>
                <div className="col-1">
                    <div className="card card-body">
                        <ul>
                            <li>
                                <h2>Order Summary</h2>
                            </li>
                            <li>
                                <div className='row' >
                                    <div>Items Price:</div>
                                    <div>${cart.itemsPrice.toFixed(2)} </div>
                                </div>
                            </li>
                            <li>
                                <div className='row' >
                                    <div>Shipping Price:</div>
                                    <div>${cart.shippingPrice.toFixed(2)} </div>
                                </div>
                            </li>
                            <li>
                                <div className='row' >
                                    <div>Tax:</div>
                                    <div>${cart.taxPrice.toFixed(2)} </div>
                                </div>
                            </li>
                            <li>
                                <div className='row' >
                                    <div>
                                        <strong> Order Total: </strong>
                                    </div>
                                    <div>
                                        <strong>${cart.totalPrice.toFixed(2)} </strong>
                                    </div>
                                </div>
                            </li>
                            <li>
                                <button
                                    type="button"
                                    onClick={placeOrderHandler}
                                    className="primary block"
                                    disabled={cart.cartItems.length === 0}
                                >
                                    Proceed to Checkout
                            </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    )
}