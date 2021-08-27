import {gql} from '@apollo/client'

export const GET_POSTS_QUERY = gql`
    query {
        getPosts{
            _id
            body
            createdAt
            firstName
            countLike
            countComment
            like {
                _id
                user
                post
            }
            comment {
                _id
                body
                firstName
                createdAt

            }
        }
    }
`

