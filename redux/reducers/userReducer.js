import ActionTypes from '../constants/actionTypes';

const initial_state = {
  User: null,
  Profile: {},
  Property: null,
  SearchProperty: [],
  SearchOptions: null,
  SearchCount: 0
};

const UserReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ActionTypes.USER:
      return {
        ...state,
        User: action.payload
      };
    case ActionTypes.PROFILE:
      return {
        ...state,
        Profile: action.payload
      };
    case ActionTypes.PROPERTY:
      return {
        ...state,
        Property: action.payload
      };
    case ActionTypes.SEARCHPROPERTY:
      return {
        ...state,
        SearchProperty: action.payload
      };
    case ActionTypes.SEARCHOPTIONS:
      return {
        ...state,
        SearchOptions: action.payload
      };
    case ActionTypes.SEARCHCOUNT:
      return {
        ...state,
        SearchCount: action.payload
      };
    default:
      return state;
  }
};
export default UserReducer;
