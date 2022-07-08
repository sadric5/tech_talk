import React, {userState, useEffect, useContext} from "react";
import {timeDelta} from "./Handler.js"
const Comment = (props) =>{
    return (
        <div className="row form-control-plaintext collapse" id={"your-comment"+props.id.id }>
            <div className='row'>
                <div class="input-group my-2">
                    <span class="input-group-text" style={{backgroundColor:"#fff", border:'none'}}> <i className="material-icons" style={{fontSize:"20px", color:"blue"}}>person</i> </span>
                    <textarea maxLength={200} name="tweet" className="form-control border border-1 overflow-hidden border border-0 border-top-1 rounded"  aria-label="With textarea" placeholder="Any comment?" style={{backgroundColor:"#D7DAE0", resize:"none", overflow:"hidden", outlineStyle:"none", border:"none"}} onFocus={{border:"none"}}> </textarea>
                    <span class="input-group-text btn border-0" style={{backgroundColor:"#fff", border:'none'}}> <i class="material-icons">send</i> </span>
                </div>
            </div>
            {props.id.comment.map(item =>
                <div className="row mx-3 mb-4 bg-white border border-1 border-opacity-2 border-start-0 border-end-0 border-bottom-0" key={item.id} style={{backgroundColor:"#DDDAE2"}}>
                    <div className="col-1 m-0 p-0 me-2">
                        <span class="input-group-text" style={{backgroundColor:"#FFFFFF", border:"none"}}> <i className="material-icons" style={{fontSize:"20px", color:"blue"}}>person</i></span>
                    </div>
                    <div className="col-10 ms-1">
                        <div className='row fw-bold'>
                            {item.username} . {timeDelta(item.publish_date)}
                        </div>
                        <div className='row p-2'>{item.comment}</div>

                    </div>
                </div>)}
       </div>
    )
}

export default Comment;