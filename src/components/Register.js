

import { Button, Checkbox, Form, Options , Grid , Message , Icon } from 'semantic-ui-react'
import {useState} from 'react'
import {CREATE_USER_MUTATION} from '../graphql/mutations'
import { useMutation } from '@apollo/client'
import '../App.css'

const Register = () => {
    const [inputData, setInputData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: ''
    })
    const [registerError, setRegisterError] = useState({})
    const onChange = (e) => {
        const {name,value} = e.target
        setInputData( data => ({ ...inputData, [name]:value }) ) 
    }

    const [createUser, {loading,error,data}] =  useMutation(CREATE_USER_MUTATION, {
        update(proxy,result){
            console.log(result)
        },onError(err){
            console.log(err.graphQLErrors[0].extensions.errors)
            setRegisterError(err.graphQLErrors[0].extensions.errors)
        }
    })

    const submitHandler = (e) => {
        e.preventDefault()
        createUser({
            variables:{
                email: inputData.email,
                password: inputData.password,
                confirmPassword: inputData.confirmPassword,
                firstName: inputData.firstName,
                lastName: inputData.lastName
            }
        })
    }

    return(
        <div className = 'registerForm'>
            {loading ? (
            <Message icon>
                <Icon name='circle notched' loading />
                <Message.Content>
                <Message.Header>Just one second</Message.Header>
                We are fetching that content for you.
                </Message.Content>
            </Message>
            ) : (
            <Form>
                <Form.Field >
                    <label>Email</label>
                    <Form.Input placeholder='linda@yahoo.com' 
                    name = "email"
                    value = {inputData.email}
                    error = {registerError.email ? true : false}
                    onChange = {onChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <Form.Input placeholder='Min 6 Character' 
                    name = 'password'
                    value = {inputData.password}
                    error = {registerError.password ? true : false}
                    onChange = {onChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Confirm Password</label>
                    <Form.Input placeholder='Min 6 Character' 
                    name = 'confirmPassword'
                    value = {inputData.confirmPassword}
                    error = {registerError.confirmPassword ? true : false}
                    onChange = {onChange}
                    />
                </Form.Field>
                <Form.Group widths='equal'>
                    <Form.Input fluid label='First name' 
                    placeholder='First name' 
                    name = 'firstName'
                    value = {inputData.firstName}
                    error = {registerError.firstName ? true : false}
                    onChange = {onChange}
                    />

                    <Form.Input fluid label='Last name' 
                    placeholder='Last name' 
                    name = 'lastName'
                    value = {inputData.lastName}
                    error = {registerError.lastName ? true : false}
                    onChange = {onChange}
                    />
                </Form.Group>
                <Form.Field>
                    <Checkbox label='I agree to the Terms and Conditions' />
                </Form.Field>
                <Button type='submit' onClick = {submitHandler}>Submit</Button>
                
            </Form>
                        )}
        </div>
    )
}

export default Register