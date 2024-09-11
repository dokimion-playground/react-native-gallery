import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { AlbumType } from "@/hooks/useGallery";

const height = 50;

interface MydropdownPickerProps {
  selectedAlbum: AlbumType;
  onPressAddAlbum: VoidFunction;
  onPressHeader: VoidFunction;
  isDropdownOpen: boolean;
  albums: AlbumType[];
  onPressAlbum: (album: AlbumType) => void;
}

export default function MyDropdownPicker({
  selectedAlbum,
  onPressAddAlbum,
  onPressHeader,
  isDropdownOpen,
  albums,
  onPressAlbum,
}: MydropdownPickerProps) {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={1}
        style={styles.container}
        onPress={onPressHeader}
      >
        <Text>{selectedAlbum.title}</Text>
        <TouchableOpacity
          onPress={onPressAddAlbum}
          style={{
            position: "absolute",
            right: 0,
            height,
            justifyContent: "center",
            alignItems: "center",
            paddingHorizontal: 10,
          }}
        >
          <Text>추가</Text>
        </TouchableOpacity>
      </TouchableOpacity>
      {isDropdownOpen && (
        <View
          style={{
            width: "100%",
            height: 100,
            position: "absolute",
            top: height,
            borderWidth: 1,
            borderColor: "lightgrey",
          }}
        >
          {albums.map((album, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => onPressAlbum(album)}
              style={{
                paddingVertical: 12,
                width: "100%",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: "#fff",
              }}
            >
              <Text>{album.title}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height,
  },
});
