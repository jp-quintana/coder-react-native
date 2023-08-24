import { StyleSheet, Text, View, Modal, Pressable } from 'react-native';
import React from 'react';

const TaskModal = ({
  task,
  handleComplete,
  handleIncomplete,
  modalVisible,
  closeModal,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        closeModal();
      }}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>{task?.name}</Text>
          <View style={styles.controls_container}>
            <Pressable
              style={[styles.button, styles.buttonComplete]}
              onPress={handleComplete}
            >
              <Text style={styles.textStyle}>Complete</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonIncomplete]}
              onPress={handleIncomplete}
            >
              <Text style={styles.textStyle}>Incomplete</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={closeModal}
            >
              <Text style={styles.textStyle}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default TaskModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonComplete: {
    backgroundColor: 'green',
  },
  buttonIncomplete: {
    backgroundColor: 'red',
  },
  buttonClose: {
    backgroundColor: '#45474b',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
  controls_container: {
    flexDirection: 'row',
    gap: 10,
  },
});
