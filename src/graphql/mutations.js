import {gql} from '@apollo/client'

export const CREATE_USER_MUTATION = gql`
    mutation createUser(
        $email:String
        $password:String
        $confirmPassword:String
        $firstName:String
        $lastName:String
    ){
        createUser(
                email:$email
                password:$password
                confirmPassword:$confirmPassword
                firstName:$firstName
                lastName:$lastName
        ){
            _id
            email
            firstName
            lastName
            createdAt
        }
    }
`

export const LOGIN_USER_MUTATION = gql`
    mutation login(
        $email:String
        $password:String

    ){
        login(
            email:$email
            password:$password
        ){
            token
            firstName
        }
    }
`

export const GET_POSTS_COMMENT_MUTATION = gql`
    mutation getComments(
        $postId:String
        $limit:Int
        $skip:Int
    ){
        getComments(
            postId: $postId
            limit: $limit
            skip: $skip
        ){
            firstName
            createdAt
            body
        }
    }
`

export const CREATE_POST_MUTATION = gql`
    mutation createPost(
        $body:String
    ){
        createPost(
            body:$body
        ){
            body
            createdAt
            _id
            firstName
        }
    }
`

export const CREATE_COMMENT_MUTATION = gql`
    mutation createComment(
        $body:String
        $postId:String
    ){
        createComment(
            body:$body
            postId:$postId
        ){
            body
            firstName
            createdAt
        }
    }
`