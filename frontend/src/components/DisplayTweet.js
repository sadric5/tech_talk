import React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';
import styles from "./App.module.css"
import {didUserLikeDislikeTweet } from './Handler';



const userId = document.getElementById("user-id").innerHTML
const url = "http://10.0.0.87:8000/likes/"


const Display = (props, {likeHandle}) =>{

    const [renderUpdata, setRenderUpdate] = useState(false)
    const linkStyle= {color:"black", textDecoration:'none'}
    const tweetComentAndOthersStyle = {fontSize:"20px", color:"none"}

    const likeDislikeColor = didUserLikeDislikeTweet(props.tweet.like);

    const userLikeStyle = {fontSize:"20px", color: likeDislikeColor.like}
    let numLike = 0;
    let numDislike=0;
    let readyToComment = false;

    const hand = () =>{ readyToComment = !readyToComment}
    
    props.tweet.like.map(item=>item.like==true?numLike+=1:numDislike+=1)



    return(
        <>
        <a href="chart" target="_blank" style={linkStyle} id="elementLink" hidden> It's hidden and can be remore any time </a>
        <div href="chart" className='row p-4 m-2' style={{backgroundColor:"#DDDAE2"}}>
            <div className='col-3' style={{backgroundColor:"#B4C1DB"}}>
                <i className="material-icons" style={{fontSize:"50px", color:"blue"}}>person</i>
            </div>
            {/* Tweet, comment, like display */}
            <div className='col-9'>
                <div className='row'>
                    <div className='col-4 fw-bold'>
                        {props.tweet.username}
                    </div>
                    <div className='col-8'>
                        {props.tweet.publish_date}
                    </div>
                </div>
                <div className='row p-2'> {props.tweet.text}</div>

                {/* comment, like and share row */}
                <div className='row mt-5'>
                    <div className='col-4'>
                        <button onClick={()=>likeHandle(props.tweet.text, props.tweet.id)} id={props.tweet.id} className="fa fa-thumbs-o-up opacity-25 border-0" style={userLikeStyle}>{numLike}</button>
                    </div>
                    <div className='col-4'>
                        <button className="far fa-comment-dots opacity-25 border-0" style={tweetComentAndOthersStyle}></button>
                        {/* To be review to show the textarea only when I click on the comment Icon */}
                        <textarea hidden maxLength={200} onChange={hand} name="tweet" className="form-control-plaintext border border-1 rounded-3" id="your-tweet" placeholder="Any comment?" style={{backgroundColor:"#D3D3D3", resize:"none", overflow:"hidden", outlineStyle:"none"}}></textarea>
                    </div>
                    <div className='col-4'>
                        <button className="fa fa-share-square-o opacity-25 border-0" style={tweetComentAndOthersStyle}></button>
                    </div>
                </div>

            </div>
        </div>
        </>

)}

export default Display;

{/* <h4>{props.tweet.username}</h4>{props.tweet.text} <em>Publication date:</em> {props.tweet.pub_date} */}




