import { Words } from '@interfaces';
import { PreviewTranslateWord, NormalizedPreviewWord } from './interfaces';

export const normalizePreviewWords = (words: Words): NormalizedPreviewWord[] => {
  return words.reduce((acc, current) => {
    const addedItem = acc.find((item) => current.groupId === item.groupId);

    const setTranslate = ({ id, translate, count }: PreviewTranslateWord): PreviewTranslateWord => ({
      id,
      translate,
      count,
    });

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
