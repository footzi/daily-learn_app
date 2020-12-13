export interface Dictionary {
  id: number;
  name: string;
  words: WordData[];
}

export interface TranslateItem {
  id: number;
  translate: string;
  count: number;
}

// сырые данные с бэка
export interface WordData {
  groupId: number;
  id: number;
  name: string;
  nameCount: number;
  translate: string;
  translateCount: number;
}

export interface Word {
  groupId: number;
  name: string;
  translates: TranslateItem[];
}