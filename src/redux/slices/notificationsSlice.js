import {LOG} from '../../utils/helperFunction';

const initialState = {
  count: 0,
};

const notificationsReducer = (state = initialState, action) => {
  // LOG('STATE: ', state);
  switch (action.type) {
    case 'SET_NOTIFICATION_COUNT':
      return {...state, count: action.payload};
    case 'INCREMENT_NOTIFICATION_COUNT':
      return {...state, count: state.count + 1};
    case 'DECREMENT_NOTIFICATION_COUNT':
      return {...state, count: Math.max(0, state.count - 1)};
    default:
      return state;
  }
};

export default notificationsReducer;
