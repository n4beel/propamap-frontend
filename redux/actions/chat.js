import serviceHandler from "../../utils/services/serviceHandler";
import cookies from "../../utils/services/cookie";
import { COOKIE_IDENTIFIER, COOKIE_ID } from "../../core/constants/auth";
import ACTIONTYPES from "../constants/actionTypes";
import socket from "../../utils/socket";

export const createChatroom = async (sellerID,propertyID) => {
  try {
    const USER_DATA = cookies.get(COOKIE_ID);
    const USER_ID = JSON.parse(USER_DATA)._id;
    const obj = {
      sellerID,
      propertyID,
      buyerID: USER_ID
    }
    const res = await serviceHandler.post(
      `chatroom/create`,
      { body: JSON.stringify(obj) },
      true
    );
    console.log("res -->", res);
    if (res.result) {
      return res.body;
    }
    throw res.message;
  } catch (e) {
    throw e;
  }
};


export const getChatroomPropertiesAction = async () => {
  try {
    const USER_DATA = cookies.get(COOKIE_ID);
    const USER_ID = JSON.parse(USER_DATA)._id;
    const res = await serviceHandler.get(
      `chatroom/properties/${USER_ID}`,
      null,
      true
    );
    console.log("res -->", res);
    if (res.result) {
      return res.body;
    }
    throw res.message;
  } catch (e) {
    throw e;
  }
};

export const getOtherChatroomAction = async () => {
    try {
      const USER_DATA = cookies.get(COOKIE_ID);
      const USER_ID = JSON.parse(USER_DATA)._id;
      const res = await serviceHandler.get(
        `chatroom/otherPropertiesChatrooms/${USER_ID}`,
        null,
        true
      );
      console.log("res -->", res);
      if (res.result) {
        return res.body;
      }
      throw res.message;
    } catch (e) {
      throw e;
    }
  };
  
  export const getChatroomsOfPropertyAction = async (propertyID) => {
    try {
      const res = await serviceHandler.get(
        `chatroom/propertiesChatroom/${propertyID}`,
        null,
        true
      );
      console.log("res -->", res);
      if (res.result) {
        return res.body;
      }
      throw res.message;
    } catch (e) {
      throw e;
    }
  };

  export const getChatroomDataAction = async (chatroomID) => {
    try {
      const res = await serviceHandler.get(
        `chatroom/getChatroomData/${chatroomID}`,
        null,
        true
      );
      console.log("res -->", res);
      if (res.result) {
        return res.body;
      }
      throw res.message;
    } catch (e) {
      throw e;
    }
  };
  
  export const sendMessage = (data) => {
    try{
      socket.emit("input",data)
    }
    catch(e) {
      throw e
    }
  }

  export const updateCount = async (obj) => {
    try{
      const res = await serviceHandler.post(
        `chatroom/updateCount`,
        { body: JSON.stringify(obj) },
        true
      );
      if (res.result) {
        return res.body;
      }
      throw res.message;
    }
    catch(e){
      throw e;
    }
  }