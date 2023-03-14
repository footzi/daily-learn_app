export const getErrorMessage = (error) => {
  if (error.response && typeof error.response.data.error !== 'undefined') {
    return error.response.data.error.message;
  } else {
    return error.message ?? "Произошла неведомая ошибка";
  }
};
