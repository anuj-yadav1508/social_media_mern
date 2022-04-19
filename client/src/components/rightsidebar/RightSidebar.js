import React, { useEffect, useState } from 'react'
import './rightsidebar.css'
import { Users } from '../../dummydata'
import Online from '../online/Online'
import Closefriend from '../../components/closefriend/Closefriend'
import { Add,Remove } from '@material-ui/icons'
import axios from 'axios'
import { useGlobalContext } from '../../context/AuthContext'


const RightSidebar = ({user}) => {

    const {user: currentUser, dispatch} = useGlobalContext()
    const [followed, setFollowed] = useState((currentUser.followings?.includes(user?.id)))
    const [friends, setFriends] = useState([])
    console.log(user)

    console.log(followed)

    useEffect(() => {
        const fetchFriends = async () => {
            try {
                const res = await axios.get(`/users/friends/${user._id}`)
                setFriends(res.data)
            } catch (err) {
                console.log(err)
            }  
        }

        fetchFriends()
    },[user]) 

    const handleFollow = async () => {
        try {
            if(!followed){
                await axios.put(`/users/follow/${user._id}`, {userId: currentUser._id})
                dispatch({type:"FOLLOW", payload:user._id})
            }else{
                await axios.put(`/users/unfollow/${user._id}`, {userId : currentUser._id})
                dispatch({type: 'UNFOLLOW', payload: user._id})
            }
        } catch (err) {
            console.log(err)
        }
        setFollowed(!followed)
    }

    const HomeRightbar = () => {
        return (
            <>
                <section className='rightsidebar-section'>
            <div className="rightbar-top">
                <img src="assets/gift.png" alt="" className="gift-image" />
                <p className="birthday-para"><b>Manu Yadav </b>and <strong>3 other friends</strong> have a birthday today.</p>
            </div>

            <div className="rightbar-add-container">
                <img src="assets/ad.png" alt="" className="rightbar-image" />
            </div>

            <h3 className="online-friend-heading">Online friends</h3>
            <ul className="online-friend-list">
                {
                    Users.map(user => {
                        return (<Online key={user.id} {...user}/>)
                    })
                }
            </ul>
        </section>
            </>
        )
    }

    const ProfileRightbar = () => {
        return(
        <section className="rightsidebar-section">
            {(user.username !== currentUser.username) &&
            <button className="rightbar-follow-button" onClick={handleFollow}>
                {followed ? "Unfollow" : "Follow"}
                {followed ? <Remove /> : <Add />}
            </button>
            }
           <div className="rightsidebar-profile-top">
               <h2 className="rightsidebar-profile-userinfo">
                   User Information
               </h2>
               <div className="profile-userinfo-item">
                   <span className="userinfo-item-span-key">City:</span>
                   <span className="userinfo-item-span-value">{user.city}</span>
               </div>
               <div className="profile-userinfo-item">
                   <span className="userinfo-item-span-key">From:</span>
                   <span className="userinfo-item-span-value">{user.from}</span>
               </div>
               <div className="profile-userinfo-item">
                   <span className="userinfo-item-span-key">Relationship:</span>
                   <span className="userinfo-item-span-value">{user.relationship === 1 ? 'Single' : user.relationship === 2 ? 'Married' : '-'}</span>
               </div>
           </div>

           <div className="user-profile-friend">
           {
               friends.map(friend => {
                   return (
                       
                    <Closefriend {...friend} key={friend.id} />
                    
                   )
               })
           }

           </div>

        </section>
        )
    }
    return (
        user? <ProfileRightbar /> : <HomeRightbar />
    )
}

export default RightSidebar
