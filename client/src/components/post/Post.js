import React,{useState, useEffect} from 'react'
import MoreVertIcon from '@material-ui/icons/MoreVert';
import './post.css'
import axios from 'axios';
import {format} from 'timeago.js'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../../context/AuthContext';

const Post = ({_id,image,desc,likes,comment, userId, createAt}) => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [isLiked, setIsLiked] = useState(false)
    const [likecounter, setLikeCounter] = useState(likes.length)
    const [user, setUser] = useState({})
    const {user: currentUser} = useGlobalContext()

    useEffect(() => {
        setIsLiked(likes.includes(currentUser._id))
    },[likes, currentUser._id])

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get(`/users?userId=${userId}`)
            console.log(res.data)
            setUser(res.data)
        }

        fetchUsers()
    },[userId])
    
    const likePost =async () => {
        try {
            await axios.put(`/posts/like/${_id}`, {userId: currentUser._id})
        } catch (err) {
            console.log(err)
        }
        setLikeCounter(isLiked ? likecounter -1 : likecounter + 1)
        setIsLiked(!isLiked)
    }
    
    return (
        <section className='post-section'>
            <div className="post-top">
                <Link to={`/profile/${user.username}`}>
                    <img src={user.ProfilePicture ? PF+user.ProfilePicture : `${PF}/person/noprofilepicture.jpg` } alt="" className="post-avatar" />
                </Link>
                <h4 className="post-username">{user.username}</h4>
                <h5 className="post-time">{format(createAt)}</h5>
                <MoreVertIcon className='post-dots'/>
            </div>

            <p className="post-desc">{desc}</p>

            <div className="post-image-container">
                <img src={PF+image} alt="" className="post-image" />
            </div>

            <div className="post-bottom">
                <div className="post-likes">
                    <img src={`${PF}like.png`} alt="" className="post-like-item" onClick={likePost}/>
                    <img src={`${PF}heart.png`} alt="" className="post-like-item" onClick={likePost}/>
                    <span className="post-likes-span">{likecounter} likes</span>
                </div>
                <div className="post-comment">
                    <p className="comment">{comment} comments</p>
                </div>
            </div>
        </section>
    )
}

export default Post
