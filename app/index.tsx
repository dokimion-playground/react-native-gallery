import {
  Button,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  ListRenderItem,
  Text,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import useGallery, { AlbumType, ImageType } from "@/hooks/useGallery";
import MyDropdownPicker from "@/components/MyDropdownPicker";
import TextInputModal from "@/components/TextInputModal";
import BigImageModal from "@/components/BigImageModal";

const width = Dimensions.get("screen").width;
const columnSize = width / 3;

export default function App() {
  const [isDetail, setIsDetail] = useState(false);

  const {
    selectedAlbum,
    pickImage,
    deleteImage,
    imagesWithAddButton,
    openModal,
    modalVisible,
    albumTitle,
    setAlbumTitle,
    addAlbum,
    closeModal,
    openDropdown,
    closeDropdown,
    isDropdownOpen,
    albums,
    selectAlbum,
    deleteAlbum,
    selectImage,
    selectedImage,
    moveToPreviousImage,
    moveToNextImage,
  } = useGallery();

  const onPressOpenGallery = () => {
    pickImage();
  };

  const onLongPress = (imageId: number) => {
    deleteImage(imageId);
  };

  const onPressAddAlbum = () => {
    openModal();
  };

  const onSubmitEditing = () => {
    if (!albumTitle) return;
    addAlbum();
    closeModal();
  };

  const onPressBackdrop = () => {
    closeModal();
  };

  const onPressHeader = () => {
    if (isDropdownOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  const onPressAlbum = (album: AlbumType) => {
    selectAlbum(album);
    closeDropdown();
  };

  const onPressImage = (image: ImageType) => {
    selectImage(image);
    setIsDetail(true);
  };

  const onPressLeftArrow = () => {
    moveToPreviousImage();
  };
  const onPressRightArrow = () => {
    moveToNextImage();
  };

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
    <SafeAreaView style={styles.container}>
      <MyDropdownPicker
        albums={albums}
        selectedAlbum={selectedAlbum}
        onPressAddAlbum={onPressAddAlbum}
        onPressHeader={onPressHeader}
        isDropdownOpen={isDropdownOpen}
        onPressAlbum={onPressAlbum}
        onLongPressAlbum={deleteAlbum}
      />
      <TextInputModal
        modalVisible={modalVisible}
        albumTitle={albumTitle}
        setAlbumTitle={setAlbumTitle}
        onSubmitEditing={onSubmitEditing}
        onPressBackdrop={onPressBackdrop}
      />
      <BigImageModal
        modalVisible={isDetail}
        onPressBackdrop={() => setIsDetail(false)}
        selectedImage={selectedImage}
        onPressLeftArrow={onPressLeftArrow}
        onPressRightArrow={onPressRightArrow}
      />
      <FlatList
        data={imagesWithAddButton}
        renderItem={renderItem}
        keyExtractor={(item, index) => index.toString()}
        numColumns={3}
        style={{ zIndex: -1 }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "pink",
  },
});
