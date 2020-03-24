export const normalizePreviewWords = words => {
  const result = [];

  words.forEach(word => {
    const isAdded = result.find(item => word.groupId === item.groupId);

    if (isAdded) {
      isAdded.translate = [...isAdded.translate, word.translate];
      isAdded.count = [...isAdded.count, word.count];
      isAdded.ids = [...isAdded.ids, word.id];
    } else {
      word.translate = [word.translate];
      word.count = [word.count];
      word.ids = [word.id];

      delete word.id;

      result.push(word);
    }
  });

  return result;
};
