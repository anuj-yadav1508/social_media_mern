import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Feed from '../../components/feed/Feed'
import LeftSidebar from '../../components/leftsidebar/LeftSidebar'
import RightSidebar from '../../components/rightsidebar/RightSidebar'
import Topbar from '../../components/topbar/Topbar'
import './profile.css'
import { useParams } from 'react-router'

const Profile = () => {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const [user, setUser] = useState({})

    const username = useParams().username
    

    useEffect(() => {
        const fetchUser = async () => {
            try{
            const res = await axios.get(`/users?username=${username}`)
            setUser(res.data)
        }catch(err){
            console.log(err)
        }
    }
        fetchUser()
    }, [username])

    console.log(user)
    return (
        <>
        <Topbar />
        <section className='profile-section'>
            
            <LeftSidebar />

            <div className="profile-right">
                <div className="profile-right-top">
                    <div className="cover-image-container">
                        <img src={user.coverPicture ? PF+user.coverPicture : `${PF}/person/nocover.jpeg`} alt="" className="cover-picture" />
                    </div>
                    <div className="profile-picture-container">
                        <img src={user.ProfilePicture ? PF+user.ProfilePicture : `${PF}/person/noprofilepicture.jpg`} alt="" className="profile-picture" />
                    </div>

                    <div className="profile-info">
                        <h3 className="profile-username">{user.username}</h3>
                        <p className="profile-desc">{user.desc}</p>
                    </div>
                </div>
                <div className="profile-right-bottom">
                    <Feed user username={username}/>
                    <RightSidebar user={user} />
                </div>
            
            </div>
            
        </section>
        </>
    )
}

export default Profile
