import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

import { signin } from '../actions/userActions';


export default function SigninScreen(props) {

    // eslint-disable-next-line no-unused-vars
    const [email, setEmail] = useState('');
    // eslint-disable-next-line no-unused-vars
    const [password, setPassword] = useState('');

    // eslint-disable-next-line react/prop-types
    const redirect = props.location.search
        // eslint-disable-next-line react/prop-types
        ? String(props.location.search.split('=')[1])
        : '/';


    const userSignin = useSelector((state => state.userSignin));
    const { userInfo, loading, error } = userSignin;

    const dispatch = useDispatch();
    const submitHandler = (e) => {
        e.preventDefault();
        dispatch(signin(email, password));
    };
    useEffect(() => {
        if (userInfo) {
            // eslint-disable-next-line react/prop-types
            props.history.push(redirect);
        }
        // eslint-disable-next-line react/prop-types
    }, [props.history, redirect, userInfo])

    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                {loading && <LoadingBox></LoadingBox>}
                {error && <MessageBox variant='danger' >{error}</MessageBox>}
                <div>
                    <label
                        htmlFor='email'
                    >
                        Email Address
                    </label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Enter email'
                        required
                        onChange={e => setEmail(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label
                        htmlFor='password'
                    >
                        Password
                    </label>
                    <input
                        type='password'
                        name='password'
                        id='password'
                        placeholder='Enter password'
                        required
                        onChange={e => setPassword(e.target.value)}
                    ></input>
                </div>
                <div>
                    <label />
                    <button
                        className="primary"
                        type='submit'
                    >
                        Sign In
                    </button>
                </div>
                <div>
                    <label />
                    <div>
                        New Customer? {' '}
                        <Link to='/register'>Create Your Account</Link>
                    </div>
                </div>
            </form>
        </div>
    )
}
