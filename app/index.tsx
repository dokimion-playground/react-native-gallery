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
  Alert,
} from "react-native";
import React, { useState } from "react";
import useGallery, { AlbumType, ImageType } from "@/hooks/useGallery";
import MyDropdownPicker from "@/components/MyDropdownPicker";
import TextInputModal from "@/components/TextInputModal";
import BigImageModal from "@/components/BigImageModal";
import ImageList from "@/components/ImageList";

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

  const onPressWatchAd = () => {};

  const onPressAddAlbum = () => {
    if (albums.length >= 2) {
      Alert.alert("광고 시청", "", [
        {
          style: "cancel",
          text: "닫기",
        },
        {
          onPress: onPressWatchAd,
          text: "광고시청",
        },
      ]);
    } else {
      openModal();
    }
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
      <ImageList
        imagesWithAddButton={imagesWithAddButton}
        onPressOpenGallery={onPressOpenGallery}
        onPressImage={onPressImage}
        onLongPress={onLongPress}
      />
      <BigImageModal
        modalVisible={isDetail}
        onPressBackdrop={() => setIsDetail(false)}
        selectedImage={selectedImage}
        onPressLeftArrow={onPressLeftArrow}
        onPressRightArrow={onPressRightArrow}
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
