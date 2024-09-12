import { useEffect, useState } from "react";
import * as ImagePicker from "expo-image-picker";
import { Alert } from "react-native";

export interface ImageType {
  id: number;
  uri: string;
  albumId?: number;
}

export interface AlbumType {
  id: number;
  title: string;
}

const defaultAlbum = {
  id: 1,
  title: "기본",
};

export default function useGallery() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [selectedAlbum, setSelectedAlbum] = useState(defaultAlbum);
  const [albums, setAlbums] = useState([defaultAlbum]);
  const [modalVisible, setModalVisible] = useState(false);
  const [albumTitle, setAlbumTitle] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<null | ImageType>(null);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);
  const openDropdown = () => setIsDropdownOpen(true);
  const closeDropdown = () => setIsDropdownOpen(false);

  const selectImage = (image: ImageType) => {
    setSelectedImage(image);
  };

  const addAlbum = () => {
    const lastId = albums.length === 0 ? 0 : albums[albums.length - 1].id;
    const newAlbum = {
      id: lastId + 1,
      title: albumTitle,
      albumId: selectedAlbum.id,
    };

    setAlbums([...albums, newAlbum]);
    setAlbumTitle("");
    setSelectedAlbum(newAlbum);
  };

  const selectAlbum = (album: AlbumType) => {
    setSelectedAlbum(album);
  };

  const deleteAlbum = (albumId: number) => {
    if (albumId === defaultAlbum.id) return;
    setAlbums(albums.filter((album) => album.id !== albumId));
    setSelectedAlbum(defaultAlbum);
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled && result.assets?.length > 0) {
      const lastId = images.length === 0 ? 0 : images[images.length - 1].id;
      const newImage = {
        id: lastId + 1,
        uri: result.assets[0].uri,
        albumId: selectedAlbum.id,
      };
      setImages([...images, newImage]);
    }
  };

  const filteredImages = images.filter(
    (image) => image.albumId === selectedAlbum.id
  );

  const deleteImage = (imageId: number) => {
    Alert.alert("이미지를 삭제하시겠습니까?", "", [
      {
        style: "cancel",
        text: "아니요",
      },
      {
        text: "네",
        onPress: () => {
          const newImages = images.filter((image) => image.id !== imageId);
          setImages(newImages);
        },
      },
    ]);
  };

  const imagesWithAddButton = [
    ...filteredImages,
    {
      id: -1,
      uri: "",
    },
  ];

  const moveToPreviousImage = () => {
    const selectedImageIndex = filteredImages.findIndex(
      (image) => image.id === selectedImage?.id
    );
    const previousImageIdx =
      selectedImageIndex === 0
        ? filteredImages.length - 1 // 첫 번째 이미지면 마지막으로 이동
        : selectedImageIndex - 1; // 아니면 이전 이미지로 이동
    const previousImage = filteredImages[previousImageIdx];
    setSelectedImage(previousImage);
  };

  const moveToNextImage = () => {
    const selectedImageIndex = filteredImages.findIndex(
      (image) => image.id === selectedImage?.id
    );
    const nextImageIdx =
      selectedImageIndex === filteredImages.length - 1
        ? 0 // 마지막 이미지면 첫 번째로 이동
        : selectedImageIndex + 1; // 아니면 다음 이미지로 이동
    const nextImage = filteredImages[nextImageIdx];
    setSelectedImage(nextImage);
  };

  return {
    selectedAlbum,
    pickImage,
    deleteImage,
    imagesWithAddButton,
    modalVisible,
    openModal,
    closeModal,
    albumTitle,
    setAlbumTitle,
    addAlbum,
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
  };
}
