import React, { useEffect, useState } from 'react'
import './message.css'
import { format } from 'timeago.js'
import axios from 'axios'

const Message = ({own, message}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [user, setUser] = useState(null)

    useEffect(() => {
        const getUser = async () => {
            try {
                const res = await axios.get(`/users?userId=${message.senderId}`)
                setUser(res.data)
                console.log(res.data)
            } catch (err) {
                console.log(err)
            }
            
        }

        getUser()
    },[message.senderId])
    return (
        <div className={own ? 'message-section own' : 'message-section'}>
            <div className="message-top">
                <div className="message-top-image-container">
                    <img src={user?.ProfilePicture ? PF+user?.ProfilePicture : `${PF}person/noprofilepicture.jpg`} alt="" className="message-top-image" />
                </div>
                <span className="message-body">{message.text}</span>
            </div>

            <div className="message-bottom">
                <p className="message-timeago">{format(message.createdAt)}</p>
            </div>
        </div>
    )
}

export default Message
