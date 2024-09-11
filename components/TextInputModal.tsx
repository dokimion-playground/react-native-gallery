import {
  KeyboardAvoidingView,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";

interface TextInputModalProps {
  modalVisible: boolean;
  albumTitle: string;
  setAlbumTitle: (albumTitle: string) => void;
  onSubmitEditing: VoidFunction;
  onPressBackdrop: VoidFunction;
}

export default function TextInputModal({
  modalVisible,
  albumTitle,
  setAlbumTitle,
  onSubmitEditing,
  onPressBackdrop,
}: TextInputModalProps) {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
        <Pressable onPress={onPressBackdrop} style={styles.modalBackground}>
          <SafeAreaView style={styles.modalContainer}>
            <TextInput
              style={styles.textInput}
              placeholder="앨범 이름을 입력하세요"
              value={albumTitle}
              onChangeText={setAlbumTitle}
              onSubmitEditing={onSubmitEditing}
              autoFocus
            />
          </SafeAreaView>
        </Pressable>
      </KeyboardAvoidingView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  textInput: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  closeButton: {
    marginTop: 15,
    backgroundColor: "#2196F3",
    padding: 10,
    alignItems: "center",
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});
