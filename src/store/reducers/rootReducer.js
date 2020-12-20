import toastReducer from './toastReducer';

const rootReducer = (state = {}, action) => {
  return {
    toast: toastReducer(state.toast, action),
  };
};

export default rootReducer;
