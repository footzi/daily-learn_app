export const createFormData = (params) => {
  const formData = new FormData();

  for (const prop of Object.keys(params)) {
    formData.append(prop, params[prop]);
  }

  return formData;
}