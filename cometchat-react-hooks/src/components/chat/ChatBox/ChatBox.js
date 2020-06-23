import React from "react";
import classes from './ChatBox.module.css';
import MDSpinner from 'react-md-spinner';

const ChatBox = props => {
    const {chat, chatIsLoading, user} = props;

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
                        <div
                            className={`${
                                chat.receiver !== user.uid ? classes.balon1 : classes.balon2
                            } p-3 m-1`}>
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