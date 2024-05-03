import { Modal, Pressable, View } from 'react-native';

export default function ModalTemplate(props) {
  return (
    <Modal
      animationType="slide"
      transparent
      visible={props.trigger}
      onBackdropPress={() => {
        props.setTrigger(false);
      }}
      onRequestClose={() => {
        props.setTrigger(false);
      }}>
      <Pressable
        className="w-screen h-screen flex justify-center items-center z-50"
        style={{ backgroundColor: 'rgba(0, 0, 0, 0.25)' }}
        onPress={() => props.setTrigger(false)}>
        <Pressable
          className="top-[-100] flex flex-col relative p-6 bg-dark1 rounded-xl items-start"
          onPress={(e) => e.stopPropagation()}>
          {props.children}
        </Pressable>
      </Pressable>
    </Modal>
  );
}
