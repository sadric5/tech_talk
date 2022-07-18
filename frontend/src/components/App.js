import {useState, useEffect, createContext} from 'react';
import React from 'react';
import axios from 'axios';
import {TweetArea} from './MyStyle';
import {didUserLikeDislikeTweet } from './Handler';
import Comment from './Comment';
import {timeDelta} from "./Handler.js"


const token = document.getElementsByName("csrfmiddlewaretoken")[0].value
axios.defaults.headers.common["X-CSRFToken"] = token
const userId = document.getElementById("user-id").innerHTML

const socket = new WebSocket('ws://localhost:8080'); 
// Connection opened
socket.addEventListener('open', function (event) {
    socket.send('Hello Server!');
});

// Listen for messages
socket.addEventListener('message', function (event) {
    console.log('Message from server ', event.data);
});

const App = ()=>{
    const url = "http://10.0.0.87:8000/tweets/"
    const [data, setData] = useState()
    const [newTweet, setNewTweet] = useState("")
    const [rerenderBol, setRerederBol] = useState(true)
    const [newComment, setnewComment] = useState('')

    // Get the data in the textarea form and send it to the API endpoint to create new intance in the database.
    const handleSubmit = (e)=>{
        e.preventDefault();
        const paramsData = {"created_by":document.getElementById("user-id").innerHTML, "text":newTweet}
        axios.post(url, paramsData)
        .then(res=>console.log(res))
        .catch(e =>console.error(e))
        .finally(() =>{
            setNewTweet("")
            setRerederBol(!rerenderBol)
        })

    }

    //  API call to get all the tweet
   const getTweets = () => {

    axios.get(url)
    .then(res =>{
        setData(res.data)
    })
    .catch(e =>console.error(e))
   }

    //   API call to update the like data 
    const likeHandler = (item) => {
        const userId = document.getElementById("user-id").innerHTML
        const url = "http://10.0.0.87:8000/likes/"
        const tweetId = item.id
        const paramsData = {"tweet": tweetId, "like_by": userId, "like":true}
        axios.post(url, paramsData)
        .then(response =>{
            console.log(response)
        })
        .catch(error=>likeTweetFailed(error, item, url))
        .finally(() => setRerederBol(!rerenderBol));
    }
    // If we already like tweet call this funtion is the .catch
    const likeTweetFailed = (res, item, url) =>{
        if(res.response.data.non_field_errors){
            // return console.log(res.response.data.non_field_errors[0], id)
            return removeLike(url, item)
        }else{
            return console.log("Error unidentified. Here was the response:", res)
        }
    }
    // remove the a user like from a tweet
    const removeLike =(url, item) => {
        const id = item.like.filter(id =>id.like_by == userId)[0].id
        axios.delete(url+id)
        .then(res=> console.log(res.status))
        .catch(error=>console.log(error))
        .finally(() => setRerederBol(!rerenderBol));

    }

    // useeffet to fetch all the tweeet
    useEffect(() =>{
        getTweets()
       }, [rerenderBol])
       
    // style for like and comment section
    const tweetComentAndOthersStyle = {fontSize:"20px", color:"none"}

    const userLikeStyle = (data) =>{
        const likeDislikeColor = didUserLikeDislikeTweet(data)
        return {fontSize:"20px", color: likeDislikeColor.like}
    } 
    // Count the number of like on each tweet
    const numberlike = (data) =>{
        let numberLike = 0;
        data.map(item=>item.like==true?numberLike+=1:"")
        return numberLike
    }

    const handleComment = (id) =>{
        setElememt(document.getElementById("your-comment"+id).setAttribute("class", "hello world"))
    }

    const handleNewComment = (e, id) => {
        const url = "http://10.0.0.87:8000/comments/"
        const paramsData = {"tweet": id, "comment": newComment, "comment_by": userId}
        e.preventDefault();
        axios.post(url, paramsData)
        .then(res=>{
            setnewComment("")
            setRerederBol(!rerenderBol)
        })
        .catch(e =>console.error(e))

    }

    return (
        <>
        <div className='container' style={{backgroundColor:"#D3D3D3"}}>
            <div className='row'>
                <div className='col-lg-3'>
                    <h3> Right bar</h3>
                </div>

                <div className='col-lg-6'>
                    {/* Area to wrtie a tweet */}
                    <div className='row m-2 border-secondary border-1'>
                        <div className='col-lg-3' style={{backgroundColor:"#B4C1DB"}}>
                            <i className="material-icons" style={{fontSize:"100px", color:"blue"}}>person</i>
                        </div>
                        <div className='col-lg-9'>
                           <form onSubmit={handleSubmit}>
                                <div className='row m-1 '>
                                    <label hidden htmlFor="your-comment">text</label>
                                    <textarea maxLength={200} onChange={(e)=>setNewTweet(e.target.value)} name="tweet" value={newTweet||""} className="form-control-plaintext border border-1 rounded-3" id="your-tweet" placeholder="What's happing in the World?" style={{backgroundColor:"#D3D3D3", resize:"none", overflow:"hidden", outlineStyle:"none"}}></textarea>
                                </div>
                                <div className='row m-1'>
                                    <div className="d-sm-flex justify-content-sm-end">
                                            <div className=''>
                                                <input type='file' id="add-image-to-tweet" hidden/>
                                                <label htmlFor='add-image-to-tweet' className='mx-3 mt-1 mb-0 pb-0"'>
                                                    <i className="fa fa-file-image-o my-0 py-0" style={{fontSize:"30px", color:"blue", cursor:"pointer"}}></i>
                                                </label>
                                                <button type='submit' className='btn btn-primary mt-0 pt-0'>Tweet</button>   
                                            </div>
                                            
                                    </div>
                                </div>
                                
                           </form>
                        </div>
                    </div>

                    {/* Display each tweet and comment with all  the like that go with it. */}
                    {data?data.map(item =>
                    <div key={item.id} href="chart" className='row p-4 m-2 rounded-2' style={{backgroundColor:"white"}}>
                        <div className='col-3' style={{backgroundColor:"#B4C1DB"}}>
                            <i className="material-icons" style={{fontSize:"50px", color:"blue"}}>person</i>
                        </div>
                        {/* Tweet, comment, like display */}
                        <div className='col-9'>
                            <div className='row'>
                                <div className='row fw-bold'>
                                    {item.username} @ {timeDelta(item.publish_date)} ago
                                </div>
                            </div>
                            <div className='row p-2'> {item.text}</div>

                            {/* comment, like and share row */}
                            <div className='row mt-5'>
                                <div className='col-4'>
                                    <button onClick={()=>likeHandler(item)} id={item.id} className="fa fa-thumbs-o-up opacity-25 border-0" style={userLikeStyle(item.like)}>{numberlike(item.like)}</button>
                                </div>
                                <div className='col-4'>
                                    <button data-bs-toggle="collapse" data-bs-target={"#your-comment"+item.id} className="far fa-comment-dots opacity-25 border-0" style={tweetComentAndOthersStyle}>{item.comment.length}</button>
                                </div>
                                <div className='col-4'>
                                    <button className="fa fa-share-square-o opacity-25 border-0" style={tweetComentAndOthersStyle}></button>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                            {/* Comment Section For Each Tweet*/}
                            <div className="row form-control-plaintext collapse" id={"your-comment"+item.id }>
                                    <div className='row'>
                                        <form onSubmit={(e)=>handleNewComment(e, item.id)}>
                                            <div className="input-group my-2">
                                                <span className="input-group-text" style={{backgroundColor:"#fff", border:'none'}}> <i className="material-icons" style={{fontSize:"20px", color:"blue"}}>person</i> </span>
                                                <textarea maxLength={200} id="tweet-comment" onChange={(e)=>setnewComment(e.target.value)} value={newComment || ""} placeholder='Any comment?' name="comment" className="form-control border border-1 overflow-hidden border border-0 border-top-1 rounded"  aria-label="With textarea" style={{backgroundColor:"#D7DAE0", resize:"none", overflow:"hidden", outlineStyle:"none", border:"none"}}> </textarea>
                                                <button tyepe="submit" className="input-group-text btn border-0" style={{backgroundColor:"#fff", border:'none'}}> <i className="material-icons">send</i> </button>
                                            </div>
                                        </form>
                                    </div>
                                    {item.comment.map(item =>
                                        <div className="row mx-3 mb-4 bg-white border border-1 border-opacity-2 border-start-0 border-end-0 border-bottom-0" key={item.id} style={{backgroundColor:"#DDDAE2"}}>
                                            <div className="col-1 m-0 p-0 me-2">
                                                <span className="input-group-text" style={{backgroundColor:"#FFFFFF", border:"none"}}> <i className="material-icons" style={{fontSize:"20px", color:"blue"}}>person</i></span>
                                            </div>
                                            <div className="col-10 ms-1">
                                                <div className='row fw-bold'>
                                                    {item.username} . {timeDelta(item.publish_date)} ago
                                                </div>
                                                <div className='row p-2'>{item.comment}</div>

                                            </div>
                                        </div>)}
                            </div>
                        </div>
                    </div>
                    ):console.log()
                    } 
                </div>
                <div className='col-lg-3'>
                    <h3> Left Bar</h3>
                </div>
            </div>
        </div>
        
        
        </>
    )
}

export default App;
