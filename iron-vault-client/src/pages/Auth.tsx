import React, { useState } from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../components/login'
import SignUp from '../components/signup'
import {  useRoutes, Link, useParams } from "react-router-dom"
import { ButtonGroup, Button } from 'reactstrap'


const Auth = (props: any) => {
    const [toggleLogin, setToggleLogin] = useState(true)
 

    return (
        <div className='auth-form'>
            <ButtonGroup className='auth-button-group'>
                <Button className='auth-button' active={toggleLogin} onClick={() => setToggleLogin(true)}>Login</Button>
                <Button className='auth-button' active={!toggleLogin} onClick={() => setToggleLogin(false)}>Sign Up</Button>
            </ButtonGroup>
            { toggleLogin ? <Login /> : <SignUp /> }
        </div>

    )

}


export default Auth