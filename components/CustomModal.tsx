import React, { FC } from 'react';
import { Modal as RNModal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ModalProps {
  animationType?: 'none' | 'slide' | 'fade';
  transparent?: boolean;
  visible: boolean;
  onRequestClose: () => void;
  isCorrect: boolean;
  modalMessage: string;
  buttonMessage: string;
  handleNextQuestion: () => void;
}

const CustomModal: FC<ModalProps> = (props) => {
  const {
    animationType = 'slide',
    transparent = true,
    visible,
    onRequestClose,
    isCorrect,
    modalMessage,
    buttonMessage,
    handleNextQuestion
  } = props;

  return (
    <RNModal
      animationType={animationType}
      transparent={transparent}
      visible={visible}
      onRequestClose={onRequestClose}
    >
      <View style={styles.centeredView}>
        <View style={[
          styles.modalView, 
          isCorrect ? styles.correctModal : styles.wrongModal
        ]}>
          <Text style={styles.modalText}>{modalMessage}</Text>
          <TouchableOpacity
            style={[styles.button, styles.buttonClose]}
            onPress={handleNextQuestion}
          >
            <Text style={styles.textStyle}>{buttonMessage}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </RNModal>
  );
};

export default CustomModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    textShadowColor: '#000',
    textShadowOffset: {
      width: 0,
      height: 2,
    },
    textShadowRadius: 4,
    elevation: 5,
    minWidth: 300,
  },
  correctModal: {
    borderColor: '#4CAF50',
    borderWidth: 3,
  },
  wrongModal: {
    borderColor: '#F44336',
    borderWidth: 3,
  }, 
  button: {
    borderRadius: 10,
    padding: 12,
    elevation: 2,
    marginTop: 15,
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
});