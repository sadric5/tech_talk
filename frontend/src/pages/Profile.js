import * as React from 'react';


const user_profile_image = document.getElementById("user_profile_image").innerHTML
const profile = user_profile_image ? user_profile_image : "../static/frontend/image/newlion.png"
const Profile = () =>{
    return(
        <>
        <div className='container pt-5 pe-5 bg-white me-3 h-100'>
            <img src={profile} className="rounded-circle mx-auto d-block" alt="..." style={{width:"100px", height:"100px"}}></img>
            <div className="row my-2">
                <div className="d-flex justify-content-center col-12">
                    <div className='mt-4 fw-bold' style={{color:'#355691'}}>Olivia Kent</div>
                </div>
                <div className="d-flex justify-content-center col-12 my-2">
                    <div className='mx-3'>
                        <p className='text-center mb-0'>12k</p>
                        <p className='text-center fw-bold'>Follows</p>
                    </div>
                    <div className='mx-3'>
                        <p className='text-center mb-0'>12k</p>
                        <p className='text-center fw-bold'>Follows</p>
                    </div>
                    <div className='mx-3'>
                        <p className='text-center mb-0'>45</p>
                        <p className='text-center fw-bold'>Likes</p>
                    </div>
                </div>
            </div>
        </div> 
        </>
    )
}

export default Profile;