import { SETTINGS } from "@constants/settings";
import shuffleArray from '../../utils/shuffle-array';

const normalizeVerb = (verb, mode) => {
  const value = verb.user_count.length && verb.user_count[0][`${mode}_count`];
  const count = verb.user_count.length && value ? value : 0;
  
  return {
    id: verb.id,
    id_unique: verb.id + `_${mode}`,
    form: mode,
    first: verb.first,
    second: verb.second,
    third: verb.third,
    question: verb[mode],
    translate: verb.translate,
    count,
    isShow: count < SETTINGS.attempt
  }
};

export const createVerbs = (verbs) => {
  const result = [];
  
  verbs.forEach(item => {
    result.push(normalizeVerb(item, 'first'));
    result.push(normalizeVerb(item, 'second'));
    result.push(normalizeVerb(item, 'third'));
  });
  
  return shuffleArray(result);
};
