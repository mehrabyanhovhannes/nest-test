import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { io } from 'socket.io-client';

import { getAllUsers } from '../../redux/actions';
import { RootReducerInterface } from '../../shared/models/rootReducer';
import { StatusInterface, UserModel } from '../../shared/models/signModel';
import './home.scss';

const Upload: React.FC = () => {
  const dispatch = useDispatch();
  const { users, currentUser } = useSelector(
    (state: RootReducerInterface) => state.user,
  );
  const client = useRef<any>();

  const [userList, setUserList] = useState<Array<UserModel & StatusInterface>>([])

  useEffect(() => {
    if (!users.length) dispatch(getAllUsers());
    const socket = io('http://localhost:3000');
    socket.on('connect', () => console.log(`Connected: ${socket.id}`));
    socket.on('connect_error', (reason) =>
      console.log(`Connection error: ${reason}`)
    );
    client.current = socket;
    return () => {
      socket.disconnect();
    }
  }, []);

  useEffect(() => {
    if (users.length) setUserList([...users]);

    client.current.on('sendCallMessage', onCallMessage);
    client.current.on('sendAcceptMessage', onAcceptMessage);
    return () => {
      client.current.off('sendCallMessage', onCallMessage);
      client.current.off('sendAcceptMessage', onAcceptMessage);
    }
  }, [users])

  const getUserButton = (user: UserModel & StatusInterface) => {
    switch(user.status) {
      case "help":
        return <button
          className="button-green"
          onClick={acceptRequest.bind(null, user)}
          disabled={user.id === currentUser.id}
        >Accept</button>
      case "accepted":
        return <span>Helper: {user.acceptor}</span>
      default:
        return <span></span>
    }
  }

  const callHelp = () => {
    client.current.emit('callHelp', currentUser);
  }

  const onCallMessage = (response: UserModel) => {
    updateUserList(response, response.id, "help");
  }

  const acceptRequest = (user: UserModel) => {
    client.current.emit('acceptCall', {currentUser, userId: user.id});
  }

  const onAcceptMessage = (response: {currentUser: UserModel, userId: number}) => {
    updateUserList(response.currentUser, response.userId, "accepted");
  }

  const updateUserList = (response: UserModel, id: number, status: string) => {
    const list = [...users];
    const index = list.findIndex((user) => user.id === id);
    list[index] = {
      ...list[index],
      acceptor: response.username,
      status,
      acceptorId: response.id,
    }
    setUserList(list);
  }

  return (
    <div className="home-container">
      <div className="container-center">
        <div className="help-container">
          <button
            className="button-blue"
            onClick={callHelp}
          >Help</button>
        </div>
        <div className="users-list">
          {userList.map((user) => (
            <div key={user.id} className="user-item">
              <span className="user-info">{user.firstName} {user.lastName}</span>
              {getUserButton(user)}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Upload;
