import React, { useState } from 'react';
import { View, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import axios from 'axios';

const PostScreen = () => {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState('');

  const selectImage = (fromCamera) => {
    const options = { mediaType: 'photo', quality: 1 };
    const picker = fromCamera ? launchCamera : launchImageLibrary;
    picker(options, (response) => {
      if (!response.didCancel && !response.error) {
        setImage(response.assets[0].uri);
      }
    });
  };

  const handlePost = async () => {
    if (!image) return alert('画像を選択してください');
    
    const formData = new FormData();
    formData.append('image', { uri: image, name: 'photo.jpg', type: 'image/jpeg' });
    formData.append('caption', caption);

    try {
      await axios.post('https://your-api.com/posts', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert('投稿完了！');
    } catch (error) {
      alert('投稿失敗...');
    }
  };

  return (
    <View style={{ padding: 20 }}>
      <TouchableOpacity onPress={() => selectImage(false)}>
        <Text>カメラロールから選択</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => selectImage(true)}>
        <Text>カメラを開く</Text>
      </TouchableOpacity>
      {image && <Image source={{ uri: image }} style={{ width: 100, height: 100 }} />}
      <TextInput
        placeholder="キャプションを書く..."
        value={caption}
        onChangeText={setCaption}
        style={{ borderWidth: 1, marginTop: 10, padding: 5 }}
      />
      <TouchableOpacity onPress={handlePost}>
        <Text>投稿する</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PostScreen;
