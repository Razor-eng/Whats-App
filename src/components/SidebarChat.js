import { Avatar, IconButton } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import db from '../firebase';
import { Link } from 'react-router-dom';
import { AddCircleOutline } from '@material-ui/icons';

function SidebarChat({ id, name, addnewChat, img }) {
    const [seed, setSeed] = useState('');
    const [lastMessage, setLastMessage] = useState('');
    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000))
        db.collection('rooms').doc(id).collection('message').orderBy('timestamp', 'desc').onSnapshot(snapshot => setLastMessage(snapshot.docs.map(doc => doc.data())))
        // eslint-disable-next-line
    }, [])

    const createChat = () => {
        let room = prompt('Please Enter the room name.');
        if (room) {
            db.collection('rooms').add(({
                name: room,
                img: `https://avatars.dicebear.com/api/human/${seed}.svg`
            }))
        }
    }

    return (
        !addnewChat ? (
            <Link to={`/room/${id}`} className='link'>
                <div className='sidebarchat'>
                    <Avatar src={img} />
                    <div className="sidebarchat_info">
                        <h2>{name}</h2>
                        <p>{lastMessage[0]?.message}</p>
                    </div>
                </div >
            </Link>
        ) : (
            <div className='addChat' onClick={createChat}>
                <h2>Add New Chat</h2>
                <h2 className='plus'>
                    <IconButton onClick={createChat}>
                        <AddCircleOutline />
                    </IconButton>
                </h2>
            </div >
        )

    )
}

export default SidebarChat
