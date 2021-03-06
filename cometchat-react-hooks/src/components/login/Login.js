import React, {useState} from 'react';
import classes from './Login.module.css';
import {NotificationManager} from 'react-notifications';
import {CometChat} from '@cometchat-pro/chat';
import config from '../../config';

const Login = (props) => {
    const [uidValue, setUidValue] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState(false);

    const handleSubmit = event => {
        event.preventDefault();
        if (uidValue !== "") {
            setError(false);
            setIsSubmitting(true);
            CometChat.login(uidValue, config.apiKey).then(
                User => {
                    NotificationManager.success('You are now logged in', 'Login Success');
                    console.log('Login Successful:', {User});
                    props.setUser(User);
                    setIsSubmitting(false);
                },
                error => {
                    NotificationManager.error('Please try again', 'Login Failed');
                    console.log('Login failed with exception:', {error});
                    setIsSubmitting(false);
                }
            );
        } else {
            setError(true);
        }
    };

    let errorMessage = null;

    if (error) {
        errorMessage = (
            <p className={classes.Error}>This field is required</p>
        );
    }

    return (
        <div className='row'>
            <div className={`col-md-6 mx-auto ${classes.LoginForm}`}>
                <h3>Login to Awesome Chat</h3>
                <form className='mt-5' onSubmit={handleSubmit}>
                    <div className='form-group position-relative'>
                        {errorMessage}
                        <input
                            type='text'
                            name='username'
                            className={`${error ? classes.InputError: null} form-control`}
                            placeholder='Your Username'
                            value={uidValue}
                            onChange={event => setUidValue(event.target.value)}
                        />
                    </div>
                    <div className='form-group'>
                        <input
                            type='submit'
                            className='btn btn-primary btn-block'
                            value={`${isSubmitting ? 'Loading...' : 'Login'}`}
                            disabled={isSubmitting}
                        />
                    </div>
                </form>
            </div>
        </div>
    );
};
export default Login;