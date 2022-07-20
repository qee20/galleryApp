import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Image,
  ToastAndroid,
  Alert,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import ImageCropPicker from 'react-native-image-crop-picker';
import Icons from 'react-native-vector-icons/Ionicons';
import storage from '@react-native-firebase/storage';
import rtdb from '@react-native-firebase/database';

const Upload = () => {
  const [imgs, setimgs] = useState(null);
  const [Wwidth, setWwidth] = useState(300);
  const [Wheight, setWheight] = useState(0);
  const [caption, setcaption] = useState('');
  const [imgUrl, setimgUrl] = useState('');

  useEffect(() => {
    console.log('Render');
  }, []);

  const uploadToFBase = () => {
    const Filename = Date.now();
    storage()
      .ref('/MyImages/' + Filename)
      .putFile(imgs)
      .then(() => {
        console.log('Terupload!');
        storage()
          .ref('MyImages/' + Filename)
          .getDownloadURL()
          .then(url => {
            rtdb()
              .ref('/GaleriKu/' + Filename)
              .set({
                timestamp: Filename,
                caption: caption,
                source: url,
              })
              .then(() => {
                Alert.alert('Info', 'Foto Berhasil Diunggah!', [
                  {text: 'Ok', style: 'default', onPress: () => setimgs(null)},
                ]);
              });
          });
      })
      .catch(e => console.log(e));
  };

  const takeLibrary = () => {
    ImageCropPicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      mediaType: 'photo',
      cropperToolbarTitle: 'Crop Foto',
      cropperToolbarWidgetColor: 'blue',
    }).then(image => {
      console.log(image);
      setimgs(image.path);
    });
  };

  const takePhotofromCamera = () => {
    ImageCropPicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
    }).then(image => {
      console.log(image);
      setimgs(image.path);
    });
  };

  const resizeImage = event => {
    let widthOrigin = event.nativeEvent.source.width;
    let heightOrigin = event.nativeEvent.source.height;
    let aspectRatio = widthOrigin / heightOrigin;
    setWheight(Wwidth / aspectRatio);
  };

  function SelectMEdia() {
    Alert.alert('User Promt', 'Pilih Media yang dinginkan', [
      {text: 'Kamera', onPress: takePhotofromCamera},
      {text: 'Galeri', onPress: takeLibrary},
    ]);
  }

  if (!imgs) {
    return (
      <View style={styles.MainLayout}>
        <View style={{margin: 10}}>
          <Text>
            Gambar Belum Ada, silahkan klik tombol dibawah untuk mengambil
            gambar
          </Text>
        </View>
        <TouchableOpacity onPress={SelectMEdia} style={styles.Kosong}>
          <Icons name="add-outline" size={50} color="#001D6E" />
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.MainLayout}>
      <Text>Foto Yang akan diunggah</Text>
      <Image
        source={{uri: imgs}}
        onLoad={resizeImage}
        style={{width: '90%', height: '50%', resizeMode: 'contain'}}
      />
      <TextInput
        multiline
        style={styles.Caption}
        onChangeText={v => setcaption(v)}
        placeholder="Masukkkan Caption"
      />
      <View style={{margin: 10}}>
        <Button onPress={uploadToFBase} title="Upload" />
      </View>
      <View style={{margin: 10}}>
        <Button
          onPress={() => setimgs(null)}
          color="red"
          title="Batalkan File"
        />
      </View>
    </SafeAreaView>
  );
};

export default Upload;

const styles = StyleSheet.create({
  MainLayout: {
    backgroundColor: '#FEE2C5',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  Kosong: {
    borderWidth: 2,
    borderStyle: 'dotted',
    padding: '10%',
  },
  Caption: {
    padding: 5,
    borderWidth: 2,
    borderRadius: 5,
    margin: 5,
  },
});
