import React, { useReducer } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import reducer from './reducer'
import JoinBlock from './components/JoinBlock';
import Chat from './components/Chat';
import socket from './socket';
import axios from 'axios';



function App() {
  const [state, dispatch] = React.useReducer(reducer, {
    joined: false,
    roomId: null,
    userName: null,
    users: [],
    messages: [] 
  })

  const onLogin = async (obj)=> {
    dispatch({
      type: 'JOINED',
      payload: obj,
    })
    socket.emit('ROOM: JOIN', obj)
    const { data } = await axios.get(`/rooms/${obj.roomId}`)
    dispatch({
      type: 'SET_DATA',
      payload: data
    })
  };


  const setUsers = (users) => {
    dispatch({
      type: 'SET_USERS',
      payload: users
    })
  }

  const addMessage = (message) => {
    dispatch({
      type: 'NEW_MESSAGE',
      payload: message,
    });
  };

  React.useEffect(() => {
    socket.on('ROOM:SET_USERS', setUsers);
    socket.on('ROOM:NEW_MESSAGE', addMessage);
  }, []);
  
  window.socket = socket;

  return (
    <div className="wrapper">
      {!state.joined ? <JoinBlock onLogin={onLogin} /> : <Chat {...state} onAddMessage={addMessage}/>}
    </div>
  );
}

export default App;
