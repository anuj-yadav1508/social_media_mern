import React, { useRef, useState } from 'react'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary';
import LabelIcon from '@material-ui/icons/Label';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import './share.css'
import { useGlobalContext } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import axios from 'axios'
import { Cancel } from '@material-ui/icons'

const Share = () => {
    const { user } = useGlobalContext()
    const PF = process.env.REACT_APP_PUBLIC_FOLDER

    const descRef = useRef()
    const [file, setFile] = useState(null)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const newPost = {
            userId: user._id,
            desc: descRef.current.value,
        }

        if(file){
            const data = new FormData()
            const filename = Date.now() + file.name
            data.append("name", filename)
            data.append("file",file)

            newPost.image = filename
            try {
                await axios.post('/upload', data)
                
            } catch (err) {
                console.log(err)
            }
        }
        console.log(newPost)
        try {
            await axios.post('/posts/create', newPost)
            window.location.reload()
        } catch (err) {
            console.log(err)
        }
        
    }

    return (
        <section className='share-section'>
            <div className="share-top">
                <Link to={`/profile/${user.username}`}>
                <div className="share-image-container">
                    <img src={user.ProfilePicture ? PF+user.ProfilePicture : `${PF}person/noprofilepicture.jpg`} alt=""  className='share-image' />
                </div>
                </Link>
                <input type="text" className="share-input" placeholder={`What's in your mind ${user.username} ?`} ref={descRef}/>
            </div>
            <hr className="share-line" />
            {file && (
                <div className="share-image-container-preview">
                    <img src={URL.createObjectURL(file)} alt="" className="share-image-preview" />
                    <Cancel className='share-cancel-button' onClick={() => setFile(null)} />
                </div>
            )}

            <form className="share-bottom" onSubmit={handleSubmit}>

            <ul className="share-list">
                <label className="share-list-item" htmlFor='file'>
                    <PhotoLibraryIcon className='share-list-icon' htmlColor='red' />
                    <span className="share-list-span">Photos or Videos</span>

                    <input type="file" id="file" accept='.jpg, .jpeg, .png' style={{display: "none"}} onChange={(e) => setFile(e.target.files[0])}/>
                </label>

                <li className="share-list-item">
                    <LabelIcon className='share-list-icon' htmlColor='blue' />
                    <span className="share-list-span">Tags</span>
                </li>

                <li className="share-list-item">
                    <LocationOnIcon className='share-list-icon' htmlColor='green'/>
                    <span className="share-list-span">Location</span>
                </li>

                <li className="share-list-item">
                    <EmojiEmotionsIcon className='share-list-icon' htmlColor='goldenrod' />
                    <span className="share-list-span">Feelings</span>
                </li>
            </ul>

            <button className="share-button" type='submit'>Share</button>
            </form>
        </section>
    )
}

export default Share
