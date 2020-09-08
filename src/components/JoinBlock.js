import React from 'react';
// import socket from '../socket'
import axios from 'axios';



function JoinBlock({ onLogin }) {
  const [roomId, setRoomId] = React.useState('');
  const [userName, setUserName] = React.useState('');
  const [isLoading, setLoading] = React.useState(false);
  const handleClick = async () => {
    console.log(roomId, userName)
    if (!roomId || !userName) {
      return alert("Введите данные")

    }

    const obj = {
      roomId,
      userName,
    }

    setLoading(true);

    await axios.post('/rooms', obj)
    onLogin(obj)
  }

  return (
    <div className="join-block">
      <input type="text" placeholder="Room ID" value={roomId} onChange={(e) => setRoomId(e.target.value)} />
      <input type="text" placeholder="Name" value={userName} onChange={(e) => setUserName(e.target.value)} />
      <button disabled={isLoading} type="button" onClick={handleClick} className="btn btn-succsess">
        {isLoading ? "Вход..." : "Войти"}
      </button>
    </div>
  )

}

export default JoinBlock;