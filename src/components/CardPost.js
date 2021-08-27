import {Card , Button, Icon, Label, Image, Modal, Header } from 'semantic-ui-react'
import {useMutation, NetworkStatus} from '@apollo/client'
import {GET_POSTS_COMMENT_MUTATION, CREATE_COMMENT_MUTATION} from '../graphql/mutations'
import moment from 'moment'
import {useEffect, useState} from 'react'
import 'semantic-ui-css/semantic.min.css'
import '../App.css'

const CardPost =  ({props}) => {
    
    const openModal = (e) => {
        setOpen(true)
        getComments({
            variables:{
                postId:(props._id),
                limit:counts.count,
                skip:0 
            }
        })

    }
    const [open, setOpen] = useState(false)
    const [show, setShow] = useState(true)

    let [limits, setLimits] = useState(0)
    let [skips, setSkips] = useState(5)

    const [comments,setComments] = useState([])

    let [tc , sTc] = useState([])
    let [counts , setCounts] = useState({
        count : skips
    })

    const [myComment , setMyComment] = useState('')

    const showAllComment = () => {
        setLimits( limits += 1 )
        if(props.comment.length > (counts.count * limits) ){
            getComments({
                variables:{
                    postId:(props._id),
                    limit:5,
                    skip: counts.count * limits
                }
            })
        }
        
        setShow(false)
    }


    const [getComments,{loading,data,error,NetworkStatus,refetch}] = useMutation(GET_POSTS_COMMENT_MUTATION,{
        notifyOnNetworkStatusChange:true,
        update(proxy,result){
            sTc(result.data.getComments)
        },onError(err){
        console.log(err.graphQLErrors)
   
         }
    })

    const [createComment] = useMutation(CREATE_COMMENT_MUTATION,{
        update(proxy,result){
           setMyComment('')
           getComments({
            variables:{
                postId:(props._id),
                limit:counts.count,
                skip:0 
            }
            })
        }
    })
    
    
    const createCommentHandler = (e) => {
        e.preventDefault()
        createComment({
            variables:{
                postId: (props._id),
                body:myComment   
            }
        })
    }


    return(
        <div>
        <Card onClick = {openModal}>
            <Card.Content>
                <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                />
                <Card.Header>{props.firstName}</Card.Header>
                <Card.Meta>{moment(props.createdAt).fromNow()}</Card.Meta>
                <Card.Description>
                    {props.body.length >= 100 ? props.body.slice(0,100).concat(' . . . '): props.body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                <Button color='red' basic>
                    <Icon name='heart' />
                    Like   
                </Button>
                <Button basic color='blue'>
                    <Icon name='chat' />
                    Comment {props.countComment}
                </Button>

                </div>
            </Card.Content>
        </Card>

    <Modal
      basic
      onClose={() => {
          setOpen(false)
          setShow(true)
          setComments([])
          sTc([])
          setLimits(0)
          
       }
      }
      onOpen={() => {
          setOpen(true) 
          
        }
        }
      open={open}
      size='tiny'
    >
       <Card>
            <Card.Content>
                <Image
                floated='right'
                size='mini'
                src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
                />
                <Card.Header>{props.firstName}</Card.Header>
                <Card.Meta>{moment(props.createdAt).fromNow()}</Card.Meta>
                <Card.Description className = "changeHeight">
                    {props.body}
                </Card.Description>
            </Card.Content>
            <Card.Content extra>
                <div className='ui two buttons'>
                <Button color='red' basic>
                    <Icon name='heart' />
                    Like   
                </Button>
                <Button basic color='blue'>
                    <Icon name='chat' />
                    Comment
                </Button>

                </div>
            </Card.Content>

            <div>
            { localStorage.getItem('token') ? (
                <div>
                <input placeholder = "Comment" 
                    value = {myComment}
                    onChange = { (e) => setMyComment(e.target.value) }
                />
                <button onClick = {createCommentHandler}>Comment</button>
                </div>
                ) : '' }
            </div>

            <div className = "insertComment">
                { show ? (
                    <div>
                        {tc.map( (value) => {
                            return (
                                <div>
                                    <h3>{value.firstName}</h3>
                                    <p>{moment(value.createdAt).fromNow()}</p>
                                    <h2>{value.body}</h2>
                                    <hr></hr>
                                </div>
                            )
                        } )}
                    </div>
                ) : (
                    <div>
                        {tc.map( (value) => {
                            return (
                            <div>
                                <h3>{value.firstName}</h3>
                                <p>{moment(value.createdAt).fromNow()}</p>
                                <h2>{value.body}</h2>
                                <hr></hr>
                            </div>
                            )
                        })
                        }
                    </div>
                )
                }
                <a onClick = {showAllComment}>Show more ...</a>
            </div>
        </Card>
    </Modal>
        </div>
    )
}

export default CardPost 