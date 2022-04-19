import axios from 'axios'
import React, { useEffect, useState } from 'react'
import './onlinefriends.css'

const OnlineFriends = ({ onlineUsers, currentId, setCurrentChat }) => {

    const [friends, setFriends] = useState([])
    const [onlineFriendsList, setOnlineFriendsList] = useState([])

    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get(`/users/friends/${currentId}`)
            setFriends(res.data)
        }
        getFriends()
    },[currentId])

    useEffect(() => {
        setOnlineFriendsList(friends.filter(friend => onlineUsers.includes(friend._id)))
    },[friends, onlineUsers])

    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const handleClick = async (user) => {
        try {
           const res = await axios.get(`/conversations/find/${currentId}/${user._id}`) 
           setCurrentChat(res.data)
           console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    }
    return (
        <div className='onlinefriends-section'>
        {
            onlineFriendsList.map(o => {
                return(       
                        <div className="onlinefriends-wrapper" onClick={() => handleClick(o)}>
                            <div className="onlinefriends-image-container">
                                <img src={o.ProfilePicture ? PF+o.ProfilePicture : `${PF}person/noprofilepicture.jpg`} alt="" className="onlinefriends-image" />
                            </div>
                            <div className="onlinefriends-badge"></div>
                            <span className="onlinefriends-username">{o.username}</span>
                        </div>
                )
            })
        }
        </div>
    )
}

export default OnlineFriends
