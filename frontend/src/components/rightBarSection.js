import * as React from 'react';
import { Outlet, Link } from 'react-router-dom';


const RightBarSection = () => {

    return (
        <>

        <div className='container-fluid' style={{backgroundColor:"#D3D3D3"}}>
            <div className='row'>
                <div className='col-lg-3 bg-light'>
                    <nav className="navbar navbar-expand-lg">
                        <div className="container-fluid">
                            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarText" aria-controls="navbarText" aria-expanded="false" aria-label="Toggle navigation">
                                <span className="navbar-toggler-icon"></span>
                            </button>
                            <div className="collapse navbar-collapse" id="navbarText">
                                <ul className="navbar-nav me-auto mb-2 mb-lg-0 flex-sm-column">
                                    <li className="nav-item my-2 my-lg-4">
                                        <Link to="/frontend" className="nav-link fs-3 fw-semibold active text-primary" aria-current="page" href="#"><i className="material-icons" style={{fontSize:'40px'}}>home</i>  Home</Link>
                                    </li>
                                    <li className="nav-item my-2 my-lg-4">
                                        <Link to="profile" className="nav-link fs-3 fw-semibold" href="#"><i className="material-icons" style={{fontSize:'40px'}}>person</i>  Profile</Link>
                                    </li>
                                    <li className="nav-item my-2 my-lg-4">
                                        <Link to="notifications" className="nav-link fs-3 fw-semibold" href="#"><i className="material-icons" style={{fontSize:'40px'}}>notifications</i>  Notifications</Link>
                                    </li>
                                    <li className="nav-item my-2 my-lg-4">
                                        <Link to="settings" className="nav-link fs-3 fw-semibold" href="#"><i className="material-icons" style={{fontSize:'40px'}}>settings</i>  Settings</Link>
                                    </li>
                                    <li className="nav-item my-2 my-lg-4">
                                        <Link to="more" className="nav-link fs-3 fw-semibold" href="#"><i style={{fontSize:'40px'}}>...</i>  More</Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </nav>
                </div>

                <div className='col-lg-6 px-4'>
                    <Outlet/>
                </div>

                <div className='col-lg-3 d-none d-lg-block'>
                    <h3> Left Bar</h3>
                </div>
            </div>
            <div className="row"></div>
            <div className="container fixed-bottom">
                <h4>Footing </h4>
            </div>

        </div>

        </>
    )
}

export default RightBarSection;