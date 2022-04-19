import React from 'react'
import './online.css'

const Online = ({profilePicture,username}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <div className='online-friend'>
            <div className="online-friend-image-container">
            <img src={PF+profilePicture} alt="" className="online-friend-image" /> 

            </div>
            <div className="green-dot"></div>
            <h3 className="online-friend-username">{username}</h3>
        </div>
    )
}

export default Online
