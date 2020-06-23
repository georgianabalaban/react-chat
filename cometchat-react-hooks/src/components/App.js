import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import 'react-notifications/lib/notifications.css';
import {NotificationContainer} from 'react-notifications';
import Login from './login/Login';
import Chat from './chat/Chat';
import './App.css';

const App = () => {
    const [user, setUser] = useState(null);
    const renderApp = () => {
        if (user) {
            return <Chat user={user}/>;
        } else {
            return <Login setUser={setUser}/>
        }
    };
  return (
    <div className="App">
        {renderApp()}
    </div>
  );
};

export default App;
