import { Button } from '@material-ui/core'
import React from 'react'
import './Login.css'
import { auth, provider } from '../firebase'
import { useDispatch } from 'react-redux';
import { signin } from '../features/userSlice';

function Login() {
    const dispatch = useDispatch();

    const login = () => {
        auth.signInWithPopup(provider).then(({ user }) => {
            dispatch(signin({
                displayName: user.displayName,
                photoUrl: user.photoURL,
                email: user.email
            }))
        }).catch(err => {
            alert(err);
        })
    }

    return (
        <div className='login'>
            <div className="login_body">
                <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/479px-WhatsApp.svg.png" alt="" />
                <h2>Sign in to WhatsApp</h2>
                <Button onClick={login}>Login wth Gmail</Button>
            </div>
        </div>
    )
}

export default Login
