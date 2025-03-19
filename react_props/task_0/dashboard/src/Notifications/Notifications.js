import React from 'react';
import "./Notifications.css"
import { getLatestNotification } from '../utils/utils'; 
import closeIcon from "../assets/close-icon.png";

const Notifications = () => {

    const closeClick = () => {
        console.log("Close button has been clicked");
    };

    return(
        <div className='Notifications'>
            <button
            onClick={closeClick}
            aria-label="Dismiss"
            style={{ 
                cursor: 'pointer',
                backgroundColor: 'transparent', 
                border: 'none',
                float: 'right',
            }}>
                <img src={closeIcon} alt="close" width={10}></img>
            </button>
            <p>Here is the list of notifications</p>
            <ul>
                <li data-priority="default">New course available</li>
                <li data-priority="urgent">New resume available</li>
                <li data-priority="urgent" dangerouslySetInnerHTML={{__html: getLatestNotification()}}></li>
            </ul>
        </div>
    )
}

export default Notifications
