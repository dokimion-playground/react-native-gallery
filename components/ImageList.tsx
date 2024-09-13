import {
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ImageType } from "@/hooks/useGallery";

const width = Dimensions.get("screen").width;
const minColumns = width > 500 ? 200 : 130;
const divisor = width / minColumns;
const numColumns = Math.floor(divisor);
const columnSize = width / numColumns;

interface ImageListProps {
  imagesWithAddButton: ImageType[];
  onPressOpenGallery: VoidFunction;
  onPressImage: (image: ImageType) => void;
  onLongPress: (id: number) => void;
}

export default function ImageList({
  imagesWithAddButton,
  onPressOpenGallery,
  onPressImage,
  onLongPress,
}: ImageListProps) {
  const renderItem: ListRenderItem<ImageType> = ({ item: image, index }) => {
    const { id, uri } = image;
    if (id === -1) {
      return (
        <TouchableOpacity
          onPress={onPressOpenGallery}
          style={{
            width: columnSize,
            height: columnSize,
            backgroundColor: "orange",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 24, color: "white" }}>+</Text>
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity
        onPress={() => onPressImage(image)}
        onLongPress={() => onLongPress(id)}
      >
        <Image
          source={{ uri }}
          style={{ width: columnSize, height: columnSize }}
        />
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={imagesWithAddButton}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      numColumns={numColumns}
      style={{ zIndex: -1 }}
    />
  );
}

const styles = StyleSheet.create({});
