import React from 'react'
import SearchIcon from '@material-ui/icons/Search';
import PersonIcon from '@material-ui/icons/Person';
import ChatIcon from '@material-ui/icons/Chat';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { Avatar } from '@material-ui/core';
import { Link } from 'react-router-dom';
import './topbar.css'
import { useGlobalContext } from '../../context/AuthContext';

const Topbar = () => {
    const { user } = useGlobalContext()
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <nav className='topbar-section'>
             <div className="topbar-left">
                 <div className="topbar-logo">
                     <Link to='/' style={{textDecoration: 'none', color: 'White'}}>
                     <h1 className='topbar-logo-heading'>GoSocial</h1>
                     </Link>
                 </div>
             </div>
             <div className="topbar-center">
                 <div className="topbar-search">
                     < SearchIcon className='topbar-search-icon' />
                     <input type="text" className="topbar-search-input" placeholder='Search your friend, post or video' />
                 </div>
             </div>
             <div className="topbar-right">
                 <div className="topbar-right-links">
                    <div  className='topbar-right-link'>HomePage</div>
                    <div  className='topbar-right-link'>Timeline</div>
                 </div>
                 <div className="topbar-right-icons">
                     <div className="topbar-single-icon">
                         <PersonIcon className='topbar-icon'/>
                         <span className="topbar-icon-span">1</span>
                     </div>

                    <Link to="/messenger">
                     <div className="topbar-single-icon" >
                         <ChatIcon className='topbar-icon'/>
                         <span className="topbar-icon-span">1</span>
                     </div>
                     </Link>

                     <div className="topbar-single-icon">
                         <NotificationsIcon className='topbar-icon'/>
                         <span className="topbar-icon-span">1</span>
                     </div>
                     
                 </div>
                 <div className="topbar-right-avatar">
                     <Link to={`/profile/${user.username}`}>
                         <Avatar src={user.ProfilePicture ? PF+user.ProfilePicture : `${PF}person/noprofilepicture.jpg`}/>
                     </Link>
                     </div>
             </div>
        </nav>
    )
}

export default Topbar
