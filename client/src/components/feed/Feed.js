import React,{useState, useEffect} from 'react'
import Share from '../share/Share'
import './feed.css';
import axios from 'axios'
import Post from '../post/Post'
import { useGlobalContext } from '../../context/AuthContext';

const Feed = ({user, username}) => {
    const [posts, setPosts] = useState([])
    console.log(username)

    const {user:currentUser} = useGlobalContext()

    useEffect(() => {
        const fetchPosts =async () => {
            const res = user ? await axios.get(`/posts/profile/${username}`) : await axios.get(`/posts/timeline/${currentUser._id}`) 
            setPosts(res.data.sort((p1,p2)=>{
                return new Date(p2.createAt) - new Date(p1.createAt)
            }))
            console.log(res.data)
        }
        fetchPosts()
    },[username, currentUser._id, user])
    return (
        <section className='feed-section'>
            {(!user || currentUser.username === username)   &&  <Share />}
            {
                posts.map((post,index) => {
                    return <Post key={index} {...post} />
                })
            } 
        </section>
    )
}

export default Feed
