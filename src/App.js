import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import Login from './components/Login';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser, signin, signout } from './features/userSlice';
import { auth } from './firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(signin({
          displayName: user.displayName,
          photoUrl: user.photoURL,
          email: user.email
        }));
      } else {
        dispatch(signout());
        toast.warn('Logged out Successfully!', {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
          theme: "light",
        });
      }
    })
  }, [dispatch]);

  return (
    <BrowserRouter>
      {
        user ?
          (
            <div div className="App">
              <div className="app_body">
                <Sidebar />
                <Routes>
                  <Route exact path='/' element={<Chat />} />
                  <Route path='/room/:roomId' element={<Chat />} />
                </Routes>
              </div>
            </div>
          )
          :
          <Login />
      }
      <ToastContainer />
    </BrowserRouter >
  );
}

export default App;
