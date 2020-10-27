export const normalizePreviewWords = (words) => {
  return words.reduce((acc, current) => {
    const addedItem = acc.find((item) => current.groupId === item.groupId);

    const setTranslate = ({ id, translate, count }) => ({ id, translate, count });

    if (!addedItem) {
      const item = {
        groupId: current.groupId,
        name: current.name,
        translates: [setTranslate(current)],
      };

      return [...acc, item];
    }

    if (addedItem) {
      addedItem.translates = [...addedItem.translates, setTranslate(current)];

      return acc;
    }
  }, []);
};
