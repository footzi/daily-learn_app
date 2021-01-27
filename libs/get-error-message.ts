export const getErrorMessage = (error): string => {
  if (error.response && typeof error.response.data.error !== 'undefined') {
    return error.response.data.error.message;
  } else {
    return error.message;
  }
};
