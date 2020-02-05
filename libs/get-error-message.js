export const getErrorMessage = error => {
  if (error.response && typeof error.response.data !== 'undefined') {
    return error.response.data.message;
  } else {
    return error.message;
  }
};
