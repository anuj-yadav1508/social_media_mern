import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context/AuthContext'
import './conversation.css'

const Conversation = ({ conversation }) => {
    const {user: currentUser } = useGlobalContext()

    const [user, setUser] = useState(null)
    
    useEffect(() => {
        const fetchUser = async () => {
            const userId = conversation.members.filter((member) => member !== currentUser._id)

            try {
                const res = await axios.get(`/users?userId=${userId}`)
                console.log(res.data)
                setUser(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchUser()
    },[conversation.members, currentUser._id])
    
    

    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    return (
        <div className='conversation'>
            <div className="conversation-image-container">
                <img src={user?.ProfilePicture ? PF+user?.ProfilePicture : `${PF}/person/noprofilepicture.jpg`} alt="" className="conversation-image" />
            </div>
            <p className="conversation-name">{user?.username}</p>
        </div>
    )
}

export default Conversation
