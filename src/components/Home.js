import { Card,Image,Button,Icon,Label,Grid } from 'semantic-ui-react'
import {useQuery,useMutation,NetworkStatus } from '@apollo/client'
import {GET_POSTS_QUERY} from '../graphql/query'
import {useState,useEffect} from 'react'
import CardPost from './CardPost'
import {CREATE_POST_MUTATION} from '../graphql/mutations'
import {Link} from 'react-router-dom'
import {useHistory} from 'react-router-dom'


import 'semantic-ui-css/semantic.min.css'
import '../App.css'

const Home = () => {
    const history = useHistory()
    const [body,setBody] = useState('')
    const [user,setUser] = useState({})
    const[posts,setPosts] = useState([])
    const {error,loading,data,networkStatus,refetch} = useQuery(GET_POSTS_QUERY,{
        notifyOnNetworkStatusChange:true 
    })


    const isLoggedIn = () => {
        return localStorage.getItem('token')
    }

    const postHandler = (e) => {
        e.preventDefault()
        createPost({
            variables:{
                body
            }
        })
    }

    const [createPost] = useMutation(CREATE_POST_MUTATION,{
        update(proxy,result){
        }
    })

    useEffect( () => {
        
        if(data || networkStatus === NetworkStatus.refetch ){
            refetch()
            setPosts(data.getPosts)
        }
        setUser(isLoggedIn)

    },[data,networkStatus])

    return(
        <div>
            { user ? (
            <div>
                <input 
                type = "text"
                value = {body}
                onChange = { (e) =>  setBody(e.target.value) }
                ></input>
                <button onClick = {postHandler} >Post</button>
            </div>
            ) : '' }
            
           <Grid columns='three' divided>
                <Grid.Row>
                    { !posts ? (<h1>Loading ...</h1>) :  posts.map( (val) => {
                        return(
                            <Grid.Column key = {val._id} >
                                <CardPost props = {val} />
                            </Grid.Column>
                        )
                    } )}
                </Grid.Row>
            </Grid>
        </div>
    )
}
export default Home