import { CLOSE_TOAST, OPEN_TOAST } from '../reducers/toastReducer';

let intervalRef;
export const toast = payload => {
  return async dispatch => {
    dispatch({
      type: OPEN_TOAST,
      payload,
    });

    const closeToast = () => {
      dispatch({
        type: CLOSE_TOAST,
        payload,
      });
    };
    clearInterval(intervalRef);
    intervalRef = setTimeout(closeToast, payload.ttl || 2000);
  };
};
