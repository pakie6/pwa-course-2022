import { useState } from 'react';
import '../css/Userlist.css';

function Userlist () {
  const [trayStatus, setTrayStatus] = useState("open");

  function onButtonClicked() {
    onclick = setTrayStatus()
  }

  return (
    <div className={"userlist "+trayStatus}>
      <div className="close-button" onClick={onButtonClicked}>x</div>
      <span Style ={{color:"white"}} > </span>
    </div>
  )
}

export default Userlist;