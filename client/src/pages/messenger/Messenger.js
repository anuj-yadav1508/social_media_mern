import React, { useEffect, useRef, useState } from 'react'
import './messenger.css'
import Topbar from '../../components/topbar/Topbar'
import Conversation from '../../components/conversation/Conversation'
import Message from '../../components/message/Message'
import OnlineFriends from '../../components/onlinefriends/OnlineFriends'
import { useGlobalContext } from '../../context/AuthContext'
import axios from 'axios'
import {io} from 'socket.io-client'

const Messenger = () => {
    const {user: currentUser} = useGlobalContext()

    const [conversations, setConversations] = useState([])
    const [currentchat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [arrivalmessage, setArrivalMessage] = useState(null)
    const [onlineUsers, setOnlineUsers] = useState([])

    const [postmessage, setPostMessage] = useState('')

    const socket = useRef()

    const scrollRef = useRef()

    // connecting to socket server
    useEffect(() => {
        socket.current = (io('ws://localhost:8900'))
        socket.current.on('getMessage', (data) => {
            setArrivalMessage({
                senderId: data.senderId,
                text: data.text,
                createdAt: Date.now()
            })
        })
    },[])


    useEffect(() => {
        arrivalmessage && currentchat?.members.includes(arrivalmessage.senderId) && 
            setMessages(prev => [...prev, arrivalmessage])
    },[arrivalmessage])

    useEffect(() => {
        socket.current?.emit('addUser' , currentUser._id)
        socket.current?.on('getUser' , users => {
            setOnlineUsers(currentUser.followings.filter((following) => users.some((user) => user.userId === following)))
            
        })
    },[currentUser])

    console.log(onlineUsers)

    // fetching conversations
    useEffect(() => {
        const fetchConversations = async () => {
            try {
                const res = await axios.get(`/conversations/${currentUser?._id}`)
                setConversations(res.data)
                console.log(res.data)
            } catch (err) {
                console.log(err)
            }
        }

        fetchConversations()
    },[currentUser])

    
// fetching messages
    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const res = await axios.get(`/messages/${currentchat?._id}`)   
                setMessages(res.data) 
                console.log(res.data)       
            } catch (err) {
                console.log(err)
            }
        }

        fetchMessages()
    },[currentchat])

    const receiverId = currentchat?.members.find(member => member !== currentUser._id)

    // handlesubmit sending message
    const handleSending = async (e) => {
        e.preventDefault()
        const newMessage = {
            conversationId: currentchat?._id,
            senderId : currentUser._id,
            text: postmessage
        }

        socket.current.emit('sendMessage', {
            senderId: currentUser._id,
            receiverId,
            text: postmessage
        })

        try {
            const res = await axios.post('/messages', newMessage)
            setMessages([...messages, res.data])  
        } catch (err) {
            console.log(err)
        }
        
        setPostMessage('')
    }

    

    // useEffect for scrolling 
    useEffect(() => {
        scrollRef.current?.scrollIntoView( { behavior: 'smooth', block: 'nearest', inline: 'start' })
    },[messages])
    return (
        <>
            <Topbar />
            <section className='messenger-section'>
                {/* starting of conversation section */}
                <div className="conversation-box">
                    <div className="conversation-box-wrapper">
                        
                        <div className="conversation-box-top">
                            <input type="text" className="conversation-box-input" placeholder="Search conversation"/>
                        </div>
                        <div className="conversation-box-bottom">
                            {
                                conversations.map((conv => {
                                    return(
                                    <div onClick={() => setCurrentChat(conv)}>
                                        <Conversation key={conv._id} conversation={conv} />
                                    </div>
                                    )
                                }))
                            }
        
                        </div>
                    </div>
                </div>

                {/* starting of chat section  */}
                <div className="chat-box">
                    <div className="chat-box-wrapper">
                        {currentchat ? 
                        <div className="chat-box-top">
                            {
                                messages.map((message) => {
                                    return(
                                        <>
                                            <Message key={message._id} message={message} own={(currentUser._id === message.senderId)}/>
                                            <div ref={scrollRef} />
                                        </>
                                    ) 
                                })
                            }
                            
                        </div>
                        : <p className='noconversation-message' >Open a conversation to get Mesages...</p>}
                        <div className="chat-box-bottom">
                            <textarea placeholder='Write your message :' className="chat-box-textarea" value={postmessage} onChange={(e) => setPostMessage(e.target.value)} ></textarea>
                            <button className="message-submit-button" onClick={handleSending}>Send</button>
                        </div>
                        
                    </div>
                </div>

                {/* starting of online friend section */}
                <div className="online-box">
                    <div className="online-box-wrapper">
                        <OnlineFriends onlineUsers={onlineUsers} currentId={currentUser._id} setCurrentChat={setCurrentChat} />
                        
                    </div>
                </div>
            </section>
        </>
    )
}

export default Messenger
