import React, { useEffect, useState } from 'react'
import './leftsidebar.css'
import RssFeedIcon from '@material-ui/icons/RssFeed';
import ChatIcon from '@material-ui/icons/Chat';
import PlayCircleFilledIcon from '@material-ui/icons/PlayCircleFilled';
import PeopleIcon from '@material-ui/icons/People';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import WorkOutlineIcon from '@material-ui/icons/WorkOutline';
import EventIcon from '@material-ui/icons/Event';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { Avatar } from '@material-ui/core';
import { useGlobalContext } from '../../context/AuthContext';
import axios from 'axios'

const LeftSidebar = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const {dispatch, user: currentUser } = useGlobalContext()
    const [friendsList, setFriendsList] = useState([])

    const handleLogout = () => {
        dispatch({type: 'LOGOUT' })
    }

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get(`/users/friends/${currentUser._id}`)
            setFriendsList(res.data)
        }

        getFriends()
    },[currentUser])

    return (
        <sidebar className='leftsidebar-section'>
            <div className="leftsidebar-center">
                <ul className="leftsidebar-list">
                    <li className="leftsidebar-list-item">
                        <RssFeedIcon className='leftsidebar-list-icon'/>
                        <span className="leftsidebar-list-item-span">Feed</span>
                    </li> 

                    <li className="leftsidebar-list-item">
                        <ChatIcon className='leftsidebar-list-icon'/>
                        <span className="leftsidebar-list-item-span">Chats</span>
                    </li>

                    <li className="leftsidebar-list-item">
                        <PlayCircleFilledIcon className='leftsidebar-list-icon'/>
                        <span className="leftsidebar-list-item-span">Videos</span>
                    </li>

                    <li className="leftsidebar-list-item">
                        <PeopleIcon className='leftsidebar-list-icon'/>
                        <span className="leftsidebar-list-item-span">Groups</span>
                    </li>

                    <li className="leftsidebar-list-item">
                        <BookmarkIcon className='leftsidebar-list-icon'/>
                        <span className="leftsidebar-list-item-span">Bookmarks</span>
                    </li>

                    <li className="leftsidebar-list-item">
                        <HelpOutlineIcon className='leftsidebar-list-icon'/>
                        <span className="leftsidebar-list-item-span">Questions</span>
                    </li>

                    <li className="leftsidebar-list-item">
                        <WorkOutlineIcon className='leftsidebar-list-icon'/>
                        <span className="leftsidebar-list-item-span">Jobs</span>
                    </li>

                    <li className="leftsidebar-list-item">
                        <EventIcon className='leftsidebar-list-icon'/>
                        <span className="leftsidebar-list-item-span">Events</span>
                    </li>

                    <li className="leftsidebar-list-item" onClick={handleLogout}>
                        <ExitToAppIcon className='leftsidebar-list-icon'/>
                        <span className="leftsidebar-list-item-span">Logout</span>
                    </li>
                </ul>

                <button className='showmore-button'>Show More</button>

                <hr className="leftsidebar-line" />

                <ul className="friends-list">
                    {
                        friendsList.map((friend => {
                            return (
                                <li className="friend-list-item">
                                    <Avatar className='friend-list-avatar' src={friend.ProfilePicture ? PF+friend.ProfilePicture: `${PF}person/noprofilepicture.jpg`}/>
                                    <span className="friend-list-span">{friend.username}</span>
                                </li>
                            )
                        }))
                    }
                </ul>
            </div>
        </sidebar>
    )
}

export default LeftSidebar
