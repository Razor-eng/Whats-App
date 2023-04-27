import { Avatar, IconButton } from '@material-ui/core'
import { Chat, DonutLarge, MoreVert, Search } from '@material-ui/icons'
import React, { useEffect, useState } from 'react'
import './Sidebar.css'
import SidebarChat from './SidebarChat'
import db from '../firebase'
import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import { useSelector } from 'react-redux'
import { selectUser } from '../features/userSlice'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Sidebar() {
    const [rooms, setRooms] = useState([]);
    const user = useSelector(selectUser);

    useEffect(() => {
        db.collection('rooms').onSnapshot(snapshot => {
            setRooms(snapshot.docs.map(doc => ({
                id: doc.id,
                data: doc.data()
            })))
        })
        toast.success('Logged in Successfully!', {
            position: "top-center",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: false,
            progress: undefined,
            theme: "light",
        });
    }, [])

    const logout = () => {
        firebase.auth().signOut();
    }

    return (
        <div className='sidebar'>
            <div className="sidebar_header">
                <div className="sidebar_headerLeft">
                    <IconButton onClick={logout}>
                        <Avatar src={user?.photoUrl} />
                    </IconButton>
                    <h3>{user?.displayName}</h3>
                </div>
                <div className="sidebar_headerRight">
                    <IconButton>
                        <DonutLarge />
                    </IconButton>
                    <IconButton>
                        <Chat />
                    </IconButton>
                    <IconButton>
                        <MoreVert />
                    </IconButton>
                </div>
            </div>

            <div className="sidebar_search">
                <div className="sidebar_searchContainer">
                    <Search />
                    <input type="text" placeholder='Search a chat' />
                </div>
            </div>

            <div className="sidebar_chats">
                <SidebarChat addnewChat />
                {
                    rooms.map(room => {
                        return <SidebarChat key={room.id} id={room.id} name={room.data.name} img={room.data.img} />
                    })
                }
            </div>
            <ToastContainer />
        </div>
    )
}

export default Sidebar
