import React from 'react';
import {useEffect, useState} from 'react';
import axios from 'axios';
import styles from "./App.module.css"




const userId = document.getElementById("user-id").innerHTML
const url = "http://10.0.0.87:8000/likes/"


const Display = (props, {likeHandle}) =>{

    



    return(
        <>
        <a href="chart" target="_blank" style={linkStyle} id="elementLink" hidden> It's hidden and can be remore any time </a>
        
        </>

)}

export default Display;

{/* <h4>{props.tweet.username}</h4>{props.tweet.text} <em>Publication date:</em> {props.tweet.pub_date} */}




