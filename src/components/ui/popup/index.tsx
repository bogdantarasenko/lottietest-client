import React, { ReactNode } from 'react';
import {
  Modal,
  ModalBody,
  ModalHeader,
  ModalOverlay,
  ModalContent,
  ModalCloseButton,
} from '@chakra-ui/react';

interface PopUpProps {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
}

export const PopUp: React.FC<PopUpProps> = ({ isOpen, onClose, children }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered>
      <ModalOverlay />
      <ModalContent m={{ base: 2, sm: 0 }}>
        <ModalHeader>Lottie Animation</ModalHeader>
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>
      </ModalContent>
    </Modal>
  );
};

