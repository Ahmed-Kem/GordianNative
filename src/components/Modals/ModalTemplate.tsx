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
        onPress={() => props.setTrigger(false)}>
        <View
          className="top-[-100] flex flex-col relative p-6 bg-dark2 rounded-xl items-start"
          style={{
            shadowColor: '#000',
            shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 4,
            elevation: 10,
          }}
          onPress={(e) => e.stopPropagation()}>
          {props.children}
        </View>
      </Pressable>
    </Modal>
  );
}
