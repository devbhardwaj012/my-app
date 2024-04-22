import React , {useEffect, useState} from 'react'
import '../Chat/Chat.css'
import {addDoc ,collection ,serverTimestamp , onSnapshot, query, where ,orderBy} from 'firebase/firestore'  // add doc is  a like entry to our table
import {auth, db } from '../../firebase-config'
// collection here is tables


/*- e.preventDefault() is a crucial line of code inside the handleSubmit function.
- e is an event object that represents the form submission event.
- preventDefault() is a method that cancels the default action of an event.
- In this case, the default action is the form submission, which would normally cause the page to reload.
- By calling e.preventDefault(), the page reload is prevented, and the form submission is handled solely by the JavaScript code.

In other words, when the user submits the form (by clicking the "Send" button), the handleSubmit function is called, and it prevents the default form submission behavior (page reload) from happening. This allows the chat interface to handle the message submission without causing a full page reload.
 */




const Chat = (props) => {

  const [newMessage ,setNewMessage]  = useState("")
  const messagesRef = collection(db , "messages")  // collection(database , name of the  collection)
  const{room} = props;               // destructuring
  const[messages ,setmessages] =useState([]);


 


// to get automatically updated when there is any change 

// ,orderBy("createdAt") -- we can only orderby room in (because  where(room)) -- that is why we have to generate the index for it 
  useEffect(()=>{
      const queryMessage = query(messagesRef ,where("room","==",room),orderBy("createdAt"));       //const unsub = onSnapshot(doc(db, 'path', 'to', 'document'), (doc) => {   console.log('Current data: ', doc.data()); });            // query is a function form firebase
      const unsubscribe = onSnapshot(queryMessage ,(snapshot)=>{                      // update the data from the db
        let messages = [];
        snapshot.forEach((doc) =>{
          messages.push({...doc.data ,id:doc.id ,text: doc.get('text'),user:doc.get('user')});  // addded id and text property int the object and inserted it into the array
        });
        setmessages(messages);
      });

      return ()=> unsubscribe();  // cleaning of the useEffect
      //In React, the useEffect hook has a return function that is used for cleaning up any side effects or resources that were created in the effect.  When you return a function from useEffect, it is called when the component is unmounted or when the dependencies change. This is useful for:  - Cleaning up event listeners - Canceling network requests - Removing timers or intervals - Releasing resources  By cleaning up these side effects, you can prevent memory leaks and ensure that your component is properly unmounted.
  } ,[]);


  const handleSubmit = async (e) =>{
      e.preventDefault();    
      if(newMessage === "") return; 
      console.log(newMessage);      
      
      await addDoc(messagesRef,{  
        // schema
        text:newMessage,
        createdAt:serverTimestamp(),
        user:auth.currentUser.displayName,
        room:room
      })

      setNewMessage("");                        // after sending we don't want that it should be present there
  }

  return (
    <>
    <div className='chat-app'>
      <div className='header'>
        <h1>Welcome to : {room.toUpperCase()} </h1>
      </div>
      <div className='messages'>
        {messages.map((message) => 
        ( <div className='message' key ={message.id}>
          <span className='user'>{message.user}</span>
          <h1  >
          {message.text}
        </h1>
        </div>
        ))}
        </div>
      <form  onSubmit ={handleSubmit}>
        <input 
        placeholder='Type your message here '
        onChange={(e) => setNewMessage(e.target.value)}           // In this code, e.target refers to the HTML element that triggered the onChange event.
        value={newMessage}
        className='input-field'
        />
        <button type='submit' className='send-button' >
          Send
        </button>
      </form>
    </div>

    


   </>


  )
}

export default Chat