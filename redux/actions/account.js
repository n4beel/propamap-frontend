import serviceHandler from '../../utils/services/serviceHandler';
import cookies from '../../utils/services/cookie';
import { COOKIE_IDENTIFIER,COOKIE_ID } from '../../core/constants/auth';
import socket from "../../utils/socket"

export const TryLogInAction = async () => {
  const res = await serviceHandler.get('user/auth');
  return res;
};

export const SignInAction = async user => {
  const res = await serviceHandler.post('user/login', {
    body: JSON.stringify(user)
  });
  if (res.result) {
    cookies.set(
      COOKIE_IDENTIFIER,
      res.token,
      user.rememberMe ? 365 * 4 : 'session'
    );
    cookies.set(
      COOKIE_ID,
      JSON.stringify(res.body),
      user.rememberMe ? 365 * 4 : 'session'
    );
  }
  connectSocket(res.token)
  return res;
};

export const connectSocket = (token) => {
  socket.on("connect",()=>{
    socket.emit("authentication",{
      token: token,
      medium: "web"
    })
  })
  socket.on('checking',(id)=>{
    console.log('connected to -->',id)
  })
  socket.on('unauthorized', (reason) => {
    console.log('Unauthorized:', reason);
  });
  
  socket.on('disconnect', (reason) => {
    console.log(`Disconnected: ${reason}`);
  });
  socket.open()
}

export const SignOutAction = async () => {
  cookies.set(COOKIE_IDENTIFIER, '', -1);
  cookies.set(COOKIE_ID, '', -1);
  socket.close()
};

