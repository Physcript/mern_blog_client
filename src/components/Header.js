
import React, { Component , useEffect } from 'react'
import { Button, Dropdown, Menu, Segment, Card, Image, Icon, Label } from 'semantic-ui-react'
import {Link, useHistory , withRouter } from 'react-router-dom'
import {useState} from 'react'

import 'semantic-ui-css/semantic.min.css'
import '../App.css'


const Header = () => {

  const history = useHistory()
  const [name,setName] = useState('')
  const [user , setUser] = useState('')
  // if(localStorage.getItem('firstName')){
  //   setUser(localStorage.getItem('firstName'))
  // }

  useEffect(() => {
    setUser(checkAuth)
    console.log(`1`)
  },[{Link},history])

  const checkAuth = () => {
    return localStorage.getItem('firstName')
  }

  const logoutHandler = (e) => {
    e.preventDefault()
    localStorage.clear()
    history.push('/')
  }

    return(
        <div>
        <Menu pointing secondary>
          <Menu.Item
            name='home'
            // active={activeItem === 'home'}
            // onClick={this.handleItemClick}
            as = {Link}
            to = "/"
          />
          <Menu.Menu position='right'>
            { user ? (
              <Menu.Item
               name='Logout'
             //   active={activeItem === 'logout'}
             //   onClick={this.handleItemClick}
              onClick={logoutHandler}
             />
            ) : ( 
            <div class = "sss">  
            <Menu.Item
              name='Login'
            //   active={activeItem === 'logout'}
            //   onClick={this.handleItemClick}
              as={Link}
              to="/login"
            />
            <Menu.Item
              name='Register'
            //   active={activeItem === 'logout'}
            //   onClick={this.handleItemClick}
              as={Link}
              to="/register"
            />
            </div>
            ) }
            </Menu.Menu>
        </Menu>
      </div>
    )
}

export default withRouter(Header)