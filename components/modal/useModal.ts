import { useState } from 'react';

import { UseModalResult } from './interfaces';

export const useModal = (): UseModalResult => {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const openModal = () => setIsOpenModal(true);
  const closeModal = () => setIsOpenModal(false);

  return { isOpenModal, openModal, closeModal };
};
