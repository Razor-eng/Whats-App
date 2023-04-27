import { Avatar, IconButton } from '@material-ui/core'
import { AttachFile, EmojiEmotions, MicNoneOutlined, MoreVert, Search } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import './Chat.css'
import { useParams } from 'react-router-dom'
import db from '../firebase'
import firebase from 'firebase/compat/app'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'

function Chat() {
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    const [img, setImg] = useState('');
    const [input, setInput] = useState('');
    const [messages, setMessages] = useState([]);
    const user = useSelector(selectUser);

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => {
                setRoomName(snapshot.data().name);
                setImg(snapshot.data().img);
            });
            db.collection('rooms').doc(roomId).collection('message').orderBy('timestamp', 'asc').onSnapshot(snapshot => {
                setMessages(snapshot.docs.map(doc => doc.data()));
            })
        }
    }, [roomId])

    const sendMessage = (e) => {
        e.preventDefault();
        if (input === '') {
        }
        db.collection('rooms').doc(roomId).collection('message').add({
            name: user?.displayName,
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        })
        setInput('');
    }

    return (
        <div className='chat'>
            <div className="chat_header">
                <Avatar src={img} />
                <div className="chat_headerInfo">
                    <h3>{roomName}</h3>
                    <p>
                        {
                            new Date(messages[messages.length - 1]?.timestamp.seconds * 1000).toLocaleTimeString()
                        }
                    </p>
                </div>
                <div className="chat_headerRight">
                    <IconButton>
                        <Search />
                    </IconButton>
                    <IconButton>
                        <AttachFile />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="chat_body">
                {
                    messages.map(message => (
                        <div key={message.message} className={`chat_message ${(user.displayName === message.name) && 'chat_reciever'}`}>
                            <span className="chat_name">{message.name}</span>
                            <div className='message_inner'>
                                {message.message}
                                <span >
                                    {
                                        new Date(message.timestamp?.seconds * 1000).toLocaleTimeString()
                                    }
                                </span>
                            </div>
                        </div>
                    ))
                }
            </div>

            <div className="chat_footer">
                <EmojiEmotions />
                <AttachFile />
                <form onSubmit={sendMessage}>
                    <input type="text" placeholder='Type your message' value={input} onChange={e => setInput(e.target.value)} />
                    <input type="submit" />
                </form>
                <MicNoneOutlined />
            </div>
        </div>
    )
}

export default Chat
