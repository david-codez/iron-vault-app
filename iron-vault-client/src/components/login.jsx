import React, { useState, useEffect } from  'react'
import { Container, Form, FormGroup, Label, Input, FormText, Button  } from 'reactstrap'
import { useDispatch, useSelector } from 'react-redux'
import { login, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'






export default function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.auth)


        
    const [formValues, setFormValues] = useState({
        email: '',
        password: '',
    })
    const {email, password} = formValues


    const onChange = (e) => {
        setFormValues((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value
        }))
    }

    useEffect(() => {
        if(isError) {
            toast.error(message)
        }
        if(isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    
    }, [user, isError, isSuccess, message, navigate])

    const onSubmit = (e) => {
        e.preventDefault()

        const userData = {
            email,
            password
        }

        dispatch(login(userData))
    }

 

    return (
        <>
        <Container>
            <h1 className='heading'>Log In</h1>
        </Container>
        <Container className='form-container'>
            <Form onSubmit={onSubmit} className='login-form'>
                <FormGroup>
                    <Label for="email">Email:</Label>
                    <Input
                        id='email'
                        name='email'
                        placeholder='Email'
                        type='text'
                        onChange={onChange}

                    />
                </FormGroup>                
                <FormGroup>
                    <Label for="password">Password:</Label>
                    <Input
                        id='password'
                        name='password'
                        placeholder='Password'
                        type='password'
                        onChange={onChange}

                    />
                </FormGroup>
                <FormGroup className='submit-button-div'>
                    <Button className='submit-button'>
                        Submit
                    </Button>
                </FormGroup>
           
            </Form>

        </Container>
        </>
    )
}