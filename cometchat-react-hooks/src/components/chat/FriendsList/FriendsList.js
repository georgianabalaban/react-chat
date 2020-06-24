import React from "react";
import MDSpinner from 'react-md-spinner';
import classes from './FriendList.module.css';

const FriendList = props => {
    const {friends, friendisLoading, selectedFriend, selectFriend} = props;
    if (friendisLoading) {
        return (
            <div className='col-xl-12 my-auto text-center'>
                <MDSpinner size='72' />
            </div>
        );
    } else {
        return (
            <ul className='list-group w-100'>
                {friends.map(friend => (
                    <li
                        key={friend.uid}
                        className={`list-group-item bg-dark text-white ${
                    friend.uid === selectedFriend ? classes.Active : ''
                }`}
                    onClick={() => selectFriend(friend.uid, friend.name, friend.avatar)}>
                    {friend.name}
                    </li>
                    ))}
            </ul>
        );
    }
};

export default FriendList;