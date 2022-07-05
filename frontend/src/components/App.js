import {useState, useEffect} from 'react';
import React from 'react';
import axios from 'axios';
import Display from './DisplayTweet';
import {TweetArea} from './MyStyle';
import "./App.module.css"


const token = document.getElementsByName("csrfmiddlewaretoken")[0].value
axios.defaults.headers.common["X-CSRFToken"] = token

const App = ()=>{
    const url = "http://10.0.0.87:8000/tweets/"
    const [data, setData] = useState()
    const [newTweet, setNewTweet] = useState("")
    const [rerenderBol, setRerederBol] = useState(true)

    // Get the data in the textarea form and send it to the API endpoint to create new intance in the database.
    const handleSubmit = (e)=>{
        e.preventDefault();
        const paramsData = {"created_by":document.getElementById("user-id").innerHTML, "text":newTweet}
        axios.post(url, paramsData)
        .then(res=>console.log(res))
        .catch(e =>console.error(e));
        setNewTweet("")
        setRerederBol(!rerenderBol)
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
    const likeHandler = (val, id) => {
        const userId = document.getElementById("user-id").innerHTML
        const url = "http://10.0.0.87:8000/likes/"
        const tweetId = id
        const paramsData = {"tweet": tweetId, "like_by": userId, "like":true}
        axios.post(url, paramsData)
        .then(response =>{
            console.log(response)
            setRerederBol(!rerenderBol)
        })
        .catch(error=>console.log(error))
    }

   useEffect(() =>{
    getTweets()
   }, [rerenderBol])
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
                                    <label hidden htmlFor="your-tweet">text</label>
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
                    {data?data.map(item => <Display key={item.id} tweet={item} likeHandle={likeHandle()}/>):console.log()}
                    {/* <Master data={data} likeHandle={likeHandler}/> */}
                    
                </div>

                <div className='col-lg-3'>
                    <h3> Left Bar</h3>
                </div>
            </div>
        </div>
        
        
        </>
    )
}


// const Master = (props) => props.data?props.data.map(item => <Display key={item.id} tweet={item} likeHandle={likeHandler}/>):console.log()

export default App;
