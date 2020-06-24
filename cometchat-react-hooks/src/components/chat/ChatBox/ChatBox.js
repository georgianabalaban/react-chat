import React from "react";
import classes from './ChatBox.module.css';
import MDSpinner from 'react-md-spinner';

const ChatBox = props => {
    const {chat, chatIsLoading, user, friendAvatar} = props;

    if (chatIsLoading) {
        return (
            <div className='col-xl-12 my-auto text-center'>
                <MDSpinner size='72' />
            </div>
        );
    } else {
        return (
            <div className='col-xl-12'>
                {chat.map(chat => (
                    <div key={chat.id} className={classes.message}>
                        <img src={chat.receiver.uid !== user.uid ? friendAvatar : user.avatar ? user.avatar : 'https://images.unsplash.com/photo-1533907650686-70576141c030?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80'} className={classes.Avatar}/>
                        <div
                            className={`${chat.receiver.uid !== user.uid ? classes.balon1 : classes.balon2} p-3 m-1`}>
                            {chat.text}
                        </div>
                    </div>
                ))}
                <div id='ccChatBoxEnd' />
            </div>
        );
    }
};

export default ChatBox;