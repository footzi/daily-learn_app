export const normalizeDictionaries = dictionaries => {
  if (!Array.isArray(dictionaries)) {
    return [];
  }

  return dictionaries.map(item => {
    const { id, name } = item;
    const normalize = {};

    normalize.id = id ? id : null;
    normalize.name = name ? name : '';
    normalize.checked = false;

    return normalize;
  });
};
