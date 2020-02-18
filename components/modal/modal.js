import React from 'react';
import Modal, { ModalContent, ModalTitle, SlideAnimation } from 'react-native-modals';

export const View = ({ isOpenModal = false, closeModal = () => {}, title = '', children }) => {
  return (
    <Modal.BottomModal
      visible={isOpenModal}
      width={1}
      onTouchOutside={closeModal}
      onSwipeOut={closeModal}
      modalTitle={<ModalTitle title={title} />}
      modalAnimation={
        new SlideAnimation({
          initialValue: 0,
          slideFrom: 'bottom',
          useNativeDriver: true
        })
      }>
      <ModalContent>{children}</ModalContent>
    </Modal.BottomModal>
  );
};
