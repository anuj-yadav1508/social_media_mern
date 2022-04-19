import { Link } from 'react-router-dom'
import React from 'react'

const Closefriend = ({id,ProfilePicture, username}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <>
             <div className="profile-friend">
                 <Link to={`/profile/${username}`}>
                 <img src={ProfilePicture ? PF+ProfilePicture : `${PF}person/noprofilepicture.jpg`} alt="" className="profile-friend-image" />
                 <h4 className="profile-friend-name">{username}</h4>
                 </Link>
             </div>
        </>
    )
}

export default Closefriend
