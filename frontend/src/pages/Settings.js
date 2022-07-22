import * as React from 'react';
import { Link } from 'react-router-dom';

const Settings = () =>{
    return(
        <>
        <h2>Here is Settings !</h2>
        <Link to='/frontend/profile'>Profile</Link>
        </>
    )
}

export default Settings;