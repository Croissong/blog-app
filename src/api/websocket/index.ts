import { Socket } from './phoenix';

export const connect = () => {
  let socket = new Socket('/socket', {params: {}});
  if (ENV === 'development') {
    socket.onError(() => socket.disconnect());
  }
  socket.connect();
  let channel = socket.channel('blog:lobby', {});
  channel.join()
    .receive('ok', resp => { console.log('Joined successfully', resp); })
    .receive('error', resp => { console.log('Unable to join', resp); });
};
