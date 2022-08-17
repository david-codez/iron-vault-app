import React, { useState, useEffect } from  'react'
import {  useSelector } from 'react-redux'
import NavBar from './Nav'
import { Container, Form, FormGroup, Label, Input, FormText, Button  } from 'reactstrap'
import { toast } from 'react-toastify'
import { register, reset } from '../features/auth/authSlice'
import type { GymMember } from '../lib/User'
import { useNavigate } from 'react-router-dom'
import { useAppDispatch } from '../app/hooks'

export default function SignUp() {
    // const router = useRouter()
    const dispatch = useAppDispatch()
    const navigate = useNavigate()
    const { user, isLoading, isError, isSuccess, message } = useSelector((state: any) => state.auth)

    
    const initialUser = {
        username: '',
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        password2: '',
        admin: false,
    }


    const [formValues, setFormValues] = useState(initialUser)

    const { username, firstName, lastName, email, password, password2, admin } = formValues



    //handling registration form submit
    const onSubmit = (e: any) => {
        // console.log(password, password2)
        //stops page reload
        e.preventDefault()
        //check if passwords match
        if(password !== password2) {
            toast.error('Passwords do not match')
        } else {
            //creating user data object for registration
            const userData: GymMember = {
                username: formValues.username,
                firstName: formValues.firstName,
                lastName: formValues.lastName, 
                email: formValues.email, 
                password: formValues.password,
                admin: formValues.admin,
            }
            console.log(userData)
            //calling register function from authSlice and passing in user 
            dispatch(register(userData))
        } 
    }




    const handleInputChange = (e: any) => {
        const {name, value} = e.target;
        setFormValues({
            ...formValues,
            [name]: value,
        });
    };




    useEffect(() => {
        if(isError) {
            toast.error(message)
        }
        if(isSuccess || user) {
            toast.success("User Created Successfully")
            navigate('/')
        }

        dispatch(reset())
    
    }, [user, isError, isSuccess, message, dispatch, navigate])


    return (
        <>
        <NavBar />
        <Container className='form-container'>
            <h1 className='heading'>Sign Up Form</h1>
            <Form onSubmit={onSubmit} className='signup-form'>
            <FormGroup>
                    <Label for='username'>
                        Username:
                    </Label>
                    <Input
                        id='username'
                        name='username'
                        placeholder='Username'
                        type='text'
                        onChange={handleInputChange}
                    />
                </FormGroup> 
                <FormGroup>
                    <Label for='firstName'>
                        First Name:
                    </Label>
                    <Input
                        id='firstName'
                        name='firstName'
                        placeholder='First Name'
                        type='text'
                        onChange={handleInputChange}
                    />
                </FormGroup>                
                <FormGroup>
                    <Label for='lastName'>
                        Last Name:
                    </Label>
                    <Input
                        id='lastName'
                        name='lastName'
                        placeholder='Last Name'
                        type='text'
                        onChange={handleInputChange}

                    />     
                </FormGroup>           
                <FormGroup>
                    <Label for='email'>
                        Email:
                    </Label>
                    <Input
                        id='email'
                        name='email'
                        placeholder='Email'
                        type='text'
                        onChange={handleInputChange}

                    />
                </FormGroup>
                <FormGroup>
                    <Label for='password1'>
                        Password:
                    </Label>
                    <Input
                        id='password'
                        name='password'
                        placeholder='Password'
                        type='password'
                        onChange={handleInputChange}

                    />
                </FormGroup>
                <FormGroup>
                    <Label for='password2'>
                        Re-enter Password:
                    </Label>
                    <Input
                        id='password2'
                        name='password2'
                        placeholder='Re-enter Password'
                        type='password'
                        onChange={handleInputChange}
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