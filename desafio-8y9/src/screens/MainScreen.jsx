import { StyleSheet, Text, View } from 'react-native';
import { useState } from 'react';
import uuid from 'react-native-uuid';

import Input from '../components/Input';
import List from '../components/List';
import TaskModal from '../components/TaskModal';

const MainScreen = () => {
  const [tasks, setTasks] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [activeTask, setActiveTask] = useState(null);

  const handleAddTask = (task) => {
    setTasks((prevState) => [
      ...prevState,
      { id: uuid.v4(), name: task, isCompleted: false },
    ]);
  };

  const handleSelect = (task) => {
    setActiveTask(task);
    setModalVisible(true);
  };

  const handleCancel = () => {
    setActiveTask(null);
    setModalVisible(false);
  };

  const handleComplete = () => {
    const updatedTasks = tasks;
    const selectedTaskIndex = tasks.findIndex(
      (task) => task.id === activeTask.id
    );

    updatedTasks[selectedTaskIndex].isCompleted = true;
    setTasks(updatedTasks);
    setActiveTask(null);
    setModalVisible(false);
  };

  const handleIncomplete = () => {
    const updatedTasks = tasks;
    const selectedTaskIndex = tasks.findIndex(
      (task) => task.id === activeTask.id
    );

    updatedTasks[selectedTaskIndex].isCompleted = false;
    setTasks(updatedTasks);
    setActiveTask(null);
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <TaskModal
        task={activeTask}
        modalVisible={modalVisible}
        handleComplete={handleComplete}
        handleIncomplete={handleIncomplete}
        closeModal={handleCancel}
      />
      <Input handleAddTask={handleAddTask} />
      <List items={tasks} handleSelect={handleSelect} />
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
});
