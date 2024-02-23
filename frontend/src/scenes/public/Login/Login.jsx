import React, {useCallback, useContext, useState} from 'react';
import './Login.scss';
import {ApiContext} from "../../../services/api/api-config";
import useFormState from "../../../hooks/useFormState";
import {LOGIN_STATE, LOGIN_LOADING_ID} from "tide-api";
import {useSelector} from "react-redux";
import BlurBall from "../../../components/BlurBall/BlurBall";
import Button from "../../../components/Button/Button";


const Login=()=>{

    const api=useContext(ApiContext);

    const {form, handleInputChange} = useFormState({});

    const login=useCallback((e)=>{
        e.preventDefault();
        if(!form.user || !form.pass)
            return;
        api.login(form.user,form.pass)
            .catch(console.error);
    },[api, form]);

    const [fullBlur, setFullBlur] = useState(false);


    // --- login state message ------
    const loginState=useSelector(({api})=>api.loggedIn);
    const loading=useSelector(({loadingIds})=>loadingIds[LOGIN_LOADING_ID] || loadingIds['Login.me']);

    let loginMsg;
    switch (loginState) {
        case LOGIN_STATE.LOGIN_ERROR:
            loginMsg= 'Lo sentimos, hubo un error al iniciar sesión.';
            break;
        case LOGIN_STATE.BAD_CREDENTIALS:
            loginMsg= 'El usuario y contraseña no coinciden';
            break;
        default:
            loginMsg= null;
            break;
    }

    return (
        <div className='Login'>

            <BlurBall fullBlur={fullBlur} />

            <form className='login-form' onSubmit={login}>
                <div className='input-block'>
                    <input className='input'
                           placeholder={'User'}
                           autoCapitalize="none"
                           onChange={handleInputChange('user')}
                           value={form.user || ''}/>
                </div>
                <div className='input-block'>
                    <input className='input'
                           type='password'
                           placeholder={'Password'}
                           onChange={handleInputChange('pass')}
                           value={form.pass || ''}/>
                </div>

                <div className='but-container'>
                    <Button
                        className='button'
                        type='submit'
                        disabled={loading}
                        onClick={()=>setFullBlur(!fullBlur)}>
                        Go
                    </Button>
                </div>
                {loginMsg &&
                    <p className='error'>{loginMsg}</p>}
            </form>
        </div>
    );
};

export default Login;
