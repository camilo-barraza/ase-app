type HandleError = (param: { err: any }) => void;

const isString = (variable: any) => {
  if (typeof variable === 'string' || variable instanceof String) return true;
  return false;
};

const getErrorMessage = (response: any) => {
  if (response.data && response.data.error && response.data.error.message && isString(response.data.error.message))
    return response.data.error.message;
  if (response.data && response.data.error && response.data.error && isString(response.data.error))
    return response.data.error;
  return null;
};

export const handleError: HandleError = async ({ err }) => {
  let msg = 'Connection Error';
  if (err.response) {
    switch (err.response.status) {
      case 401:
        msg = 'Authorization Required';
        break;
      case 500:
        msg = 'An error has occured on our server. Please try again later';
        break;
      default:
        msg = getErrorMessage(err.response);
        break;
    }
  }
  // handle error message
  console.log({
    msg,
    type: 'error',
  });
};
