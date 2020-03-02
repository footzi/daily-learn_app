export const initState = {
  auth: '', // при первом запуске состояние не известно
  user: null,
  data: null,
  homeScreen: {
    dictionaries: []
  },
  dictionariesScreen: {
    dictionaryWords: []
  },
  processing: false,
  test: '',
  notification: {
    type: '',
    text: ''
  }
};
