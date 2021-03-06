import React, {useState, useEffect} from 'react';

import {CometChat} from '@cometchat-pro/chat';
import classes from './Chat.module.css';
import ChatBox from "./ChatBox/ChatBox";
import FriendList from "./FriendsList/FriendsList";

const MESSAGE_LISTENER_KEY = 'listener-key';
const limit = 30;

const Chat = ({user}) => {
    const [friends, setFriends] = useState([]);
    const [selectedFriend, setSelectedFriend] = useState("");
    const [selectedFriendName, setSelectedFriendName] = useState("");
    const [friendAvatar, setFriendAvatar] = useState('');
    const [chat, setChat] = useState([]);
    const [chatIsLoading, setChatIsLoading] = useState(false);
    const [friendisLoading, setFriendisLoading] = useState(true);
    const [message, setMessage] = useState("");

    useEffect(() => {
        let usersRequest = new CometChat.UsersRequestBuilder()
            .setLimit(limit)
            .build();
        usersRequest.fetchNext().then(
            userList => {
                console.log('User list received:', userList);
                setFriends(userList);
                setFriendisLoading(false);
            },
            error => {
                console.log('User list fetching failed with error:', error);
            }
        );
        return () => {
            CometChat.removeMessageListener(MESSAGE_LISTENER_KEY);
            CometChat.logout();
        };
    }, []);

    const selectFriendHandler = (uid, name, avatar) => {
        setSelectedFriend(uid);
        setSelectedFriendName(name);
        setFriendAvatar(avatar);
        setChat([]);
        setChatIsLoading(true);
    };
    const scrollToBottom = () => {
        let node = document.getElementById('ccChatBoxEnd');
        node.scrollIntoView();
    };

    useEffect(() => {
// will run when selectedFriend variable value is updated
// fetch previous messages, remove listener if any
// create new listener for incoming message

        if (selectedFriend) {
            let messagesRequest = new CometChat.MessagesRequestBuilder()
                .setUID(selectedFriend)
                .setLimit(limit)
                .build();

            messagesRequest.fetchPrevious().then(
                messages => {
                    console.log(messages);
                    setChat(messages);
                    setChatIsLoading(false);
                    scrollToBottom();
                },
                error => {
                    console.log('Message fetching failed with error:', error);
                    setChatIsLoading(false);
                    scrollToBottom();
                }
            );

            return () => {
                CometChat.removeMessageListener(MESSAGE_LISTENER_KEY);

                CometChat.addMessageListener(
                    MESSAGE_LISTENER_KEY,
                    new CometChat.MessageListener({
                        onTextMessageReceived: message => {
                            console.log('Incoming Message Log', {message});
                            if (selectedFriend === message.sender.uid) {
                                setChat(prevState => [...prevState, message]);
                            }
                        },
                    })
                );
            };
        }
    }, [selectedFriend]);

    const handleSubmit = event => {
        event.preventDefault();
        let textMessage = new CometChat.TextMessage(
            selectedFriend,
            message,
            CometChat.RECEIVER_TYPE.USER
        );
        CometChat.sendMessage(textMessage).then(
            message => {
                console.log('Message sent successfully:', message);
                setChat([...chat, message]);
            },
            error => {
                console.log('Message sending failed with error:', error);
            }
        );
        setMessage('');
    };

    return (
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-2' />
                <div className='col-md-8 h-100pr border rounded'>
                    <div className='row'>
                        <div className='col-lg-4 col-xs-12 bg-dark' style={{height: 658}}>
                            <div className='row p-3 text-primary'>
                                <h2>Friend List</h2>
                            </div>
                            <div
                                className='row ml-0 mr-0 h-75 bg-dark border rounded'
                                style={{height: '100%', overflow: 'auto'}}>
                                <FriendList
                                    friends={friends}
                                    friendisLoading={friendisLoading}
                                    selectFriend={(uid, name, avatar) => selectFriendHandler(uid, name, avatar)}
                                    selectedFriend={selectedFriend}
                                />
                            </div>
                        </div>
                        <div className='col-lg-8 col-xs-12 bg-light' style={{height: 658}}>
                            <div className='p-3'>
                                <h2>{selectedFriend ? 'Chat with '+ selectedFriendName : 'Who you gonna chat with?'}</h2>
                                {selectedFriend ? <p className="text-secondary">Already {chat.length} messages</p> : null}
                            </div>
                            <div
                                className='row pt-5 bg-white'
                                style={{height: 530, overflow: 'auto'}}>
                                <ChatBox
                                    chat={chat}
                                    chatIsLoading={chatIsLoading}
                                    user={user}
                                    friendAvatar={friendAvatar}
                                />
                            </div>
                            <div className='row bg-light' style={{bottom: 0, width: '100%'}}>
                                <form className='row m-0 p-0 w-100' onSubmit={handleSubmit}>
                                    <div className='col-9 m-0 p-1'>
                                        <input
                                            id='text'
                                            className='mw-100 border rounded form-control'
                                            type='text'
                                            onChange={event => {
                                                setMessage(event.target.value);
                                            }}
                                            value={message}
                                            placeholder='Type a message...'
                                        />
                                    </div>
                                    <div className='col-3 m-0 p-1'>
                                        <button
                                            className={`btn btn-outline-secondary rounded w-100 ${classes.Button}`}
                                            title='Send'
                                            style={{paddingRight: 16}}>
                                            Send
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
export default Chat;