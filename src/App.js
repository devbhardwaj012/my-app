import { useState ,useRef } from 'react';
import './App.css';
import Auth from './components/Auth/Auth';
import Cookies from 'universal-cookie'
import Chat from './components/Chat/Chat';
import {signOut}  from 'firebase/auth'
import {auth}  from  './firebase-config'


const cookies = new Cookies();



function App() {
  const [isAuth,setIsAuth] = useState(cookies.get("auth-token"))
  const [room ,setRoom ]  = useState(null);
  
  const roomInputRef = useRef(null);

  const signUserOut = async ()=>{
    await signOut(auth)
    cookies.remove('auth-token')
    setIsAuth(false)
    setRoom(null)
  }

  if(!isAuth){
    return (
      <div className='auth-container' >
         <Auth  setIsAuth={setIsAuth} />
      </div>
    );   
  }



    return(
      <>
  <div className="app-container">
      {room ?(
      <Chat room ={room} />):
    <div className="room-input-container">

       <label className="room-input-label">Enter Room name</label>
       <input ref={roomInputRef} 
            className="room-input-field"
            type="text"
            placeholder="Enter room name"
       />
       <button className='enter-chat-btn' onClick={()=>setRoom(roomInputRef.current.value)}>Enter Chat</button>
    </div>}
  </div>

  <div className='sign-out sign-out-wrapper'> 
      <button onClick={signUserOut}>Sign Out</button>
  </div>
</>
  );

  

}

export default App;
