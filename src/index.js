import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import {ApolloProvider,ApolloClient,InMemoryCache,creaHttpLink, createHttpLink} from '@apollo/client'
import { setContext } from '@apollo/client/link/context';

const httpLink = new createHttpLink({
  uri: 'https://radiant-forest-67112.herokuapp.com/'
})

const authLink = setContext((_,{headers}) => {
  const token = localStorage.getItem('token')
  return {
    headers:{
      ...headers,
      authorization: token ? `Bearer ${token}` : ''
   }
  }
})

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
})



ReactDOM.render(
  <ApolloProvider client = {client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
