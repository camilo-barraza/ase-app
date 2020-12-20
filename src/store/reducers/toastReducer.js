export const OPEN_TOAST = 'OPEN_TOAST';
export const CLOSE_TOAST = 'CLOSE_TOAST';

const initState = {
  type: 'info',
  msg: '',
  open: false,
};

const componentReducer = (state = initState, action) => {
  switch (action.type) {
    case OPEN_TOAST:
      return {
        type: action.payload.type,
        msg: action.payload.msg,
        open: true,
      };
    case CLOSE_TOAST:
      return {
        ...state,
        open: false,
      };
    default:
      return state;
  }
};

export default componentReducer;
