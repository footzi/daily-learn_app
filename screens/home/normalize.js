export const normalizeDictionaries = (dictionaries) => {
  return dictionaries.map((item) => {
    const { id, name } = item;
    const dict = {};
    
    dict.id = id;
    dict.name = name;
    dict.checked = false;
    
    return dict;
  });
};

