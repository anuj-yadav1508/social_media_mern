import React from 'react'
import Feed from '../../components/feed/Feed'
import LeftSidebar from '../../components/leftsidebar/LeftSidebar'
import RightSidebar from '../../components/rightsidebar/RightSidebar'
import Topbar from '../../components/topbar/Topbar'
import './home.css'

const Home = () => {
    return (
        <>
        <Topbar />
        <section className='home-section'>
            <LeftSidebar />
            <Feed />
            <RightSidebar />
        </section>
        </>
    )
}

export default Home
