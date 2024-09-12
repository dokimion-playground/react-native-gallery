import {
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ImageType } from "@/hooks/useGallery";
import { Ionicons } from "@expo/vector-icons";

interface BigImageModalProps {
  modalVisible: boolean;
  onPressBackdrop: VoidFunction;
  selectedImage: ImageType | null;
  onPressLeftArrow: VoidFunction;
  onPressRightArrow: VoidFunction;
}

export default function BigImageModal({
  modalVisible,
  onPressBackdrop,
  selectedImage,
  onPressLeftArrow,
  onPressRightArrow,
}: BigImageModalProps) {
  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible}>
      <Pressable
        onPress={onPressBackdrop}
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "rgba(86, 107, 107, 0.8)",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <TouchableOpacity onPress={onPressLeftArrow} style={{ padding: 10 }}>
            <Ionicons name="arrow-back" size={30} color="white" />
          </TouchableOpacity>

          <Pressable>
            <Image
              source={{ uri: selectedImage?.uri }}
              style={{
                width: 300,
                height: 300,
                backgroundColor: "#fff",
              }}
              resizeMode="contain"
            />
          </Pressable>

          <TouchableOpacity onPress={onPressRightArrow} style={{ padding: 10 }}>
            <Ionicons name="arrow-forward" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </Pressable>
    </Modal>
  );
}

const styles = StyleSheet.create({});
