import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CheckoutSteps from '../components/CheckoutSteps'
import {
    savePaymentMethod
} from '../actions/cartActions';

export default function PaymentMethodScreen(props) {

    const [paymentMethod, setPaymentMethod] = useState('Paypal');

    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart;

    if (!shippingAddress.address) {
        // eslint-disable-next-line react/prop-types
        props.history.push('/shipping');
    }

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(savePaymentMethod(paymentMethod));
        // eslint-disable-next-line react/prop-types
        props.history.push('/placeorder');
    };

    return (
        <div>
            <CheckoutSteps step1 step2 step3 />
            <form className='form' onSubmit={submitHandler} >
                <div>
                    <h1>Payment Method</h1>
                </div>
                <div>
                    <div>
                        <input
                            type="radio"
                            name="paymentMethod"
                            id="paypal"
                            value='Paypal'
                            required
                            checked
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="paypal">Paypal</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="paymentMethod"
                            id="stripe"
                            value='Stripe'
                            required
                            onChange={(e) => setPaymentMethod(e.target.value)}
                        />
                        <label htmlFor="stripe">Stripe</label>
                    </div>
                </div>
                <div>
                    <label />
                    <button
                        className="primary"
                        type='submit'
                    >
                        Proceed to Payment
                    </button>
                </div>

            </form>


        </div>
    )
}
