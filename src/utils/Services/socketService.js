import {io} from 'socket.io-client';

let socket;

export const connectSocket = userData => {
  socket = io('https://react.customdev.solutions:3011/', {
    transports: ['websocket'],
  });

  socket.on('connect', () => {
    console.log('Socket connected');
    socket.emit('setup', userData);
  });

  return socket;
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    console.log('Socket disconnected');
  }
};
