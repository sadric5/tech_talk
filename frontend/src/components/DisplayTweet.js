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
       
        </>

)}

export default Display;

{/* <h4>{props.tweet.username}</h4>{props.tweet.text} <em>Publication date:</em> {props.tweet.pub_date} */}




