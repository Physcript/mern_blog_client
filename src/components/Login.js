
import {Form, Button} from 'semantic-ui-react'
import {useState} from 'react'
import { useHistory } from "react-router-dom";
import {LOGIN_USER_MUTATION} from '../graphql/mutations'
import {useMutation} from '@apollo/client'

import '../App.css'

const Login = () => {

    let history = useHistory();
    const [loginError,setLoginError] = useState({})
    const [inputData,setLoginData] = useState({
        'email':'',
        'password':''
    })

    const [login,{error,loading,data}] = useMutation(LOGIN_USER_MUTATION,{
        update(proxy,result){
            console.log(result.data.login.token)
            localStorage.setItem('token',result.data.login.token)
            localStorage.setItem('firstName', result.data.login.firstName)
            history.push('/');

        },onError(err){
           
           setLoginError(err.graphQLErrors[0].extensions.errors)
  
        }
    })

    const onChange = (e) => {
        const {name,value} = e.target
        setLoginData( data => ({ ...inputData, [name]:value }) )
    }

    const handlerLogin = (e) => {
        e.preventDefault()
        login({
            variables:{
                email: inputData.email,
                password: inputData.password
            }
        })

    }

    return(
        <div className = 'loginForm'>
            <Form>
                <Form.Field >
                    <label>Email</label>
                    <Form.Input placeholder='linda@yahoo.com' 
                    name = "email"
                    value = {inputData.email}
                    error = {loginError.email ? true : false}
                    onChange = {onChange}
                    />
                </Form.Field>
                <Form.Field>
                    <label>Password</label>
                    <Form.Input placeholder='Min 6 Character' 
                    type = 'password'
                    name = 'password'
                    value = {inputData.password}
                    error = {loginError.password ? true : false}
                    onChange = {onChange}
                    />
                </Form.Field><Form.Field>
                    <Button onClick = {handlerLogin}>Login</Button>
                </Form.Field>
            </Form>
        </div>
    )
}

export default Login