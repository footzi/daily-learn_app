export interface TranslateItem {
  id: number;
  translate: string;
  count: number;
}

export interface Word {
  groupId: number;
  name: string;
  translates: TranslateItem[];
}