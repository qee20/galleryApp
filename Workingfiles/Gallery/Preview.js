import { Image, StyleSheet, Text, View, Dimensions,  Linking, Alert } from 'react-native'
import React, {useEffect, useState} from 'react'
import IconButton from 'react-native-vector-icons/MaterialCommunityIcons'
import rtdb from '@react-native-firebase/database'

const Preview = ({route, navigation}) => {

  const { imageItem } = route.params;

  function deleteImage() {
    rtdb().ref('/GaleriKu/' + imageItem.timestamp).remove()
    .then(()=>{
      Alert.alert('Info', 'Gambar Berhasil Dihapus', [{text : 'Ok', style : 'default', onPress : ()=>  navigation.navigate('Home')}])
    })
  }

  useEffect(() => {
    console.log(imageItem);
  }, [])
  


  return (
    <View>
      <Text style={{textAlign : 'center', margin  :5, fontSize :15, fontWeight : 'bold'}}>{imageItem.caption}</Text>
      <View>
        <Image resizeMode='contain' style={{width : Dimensions.get('screen').width, height : Dimensions.get('screen').height * 60/100}} source={{uri : imageItem.source}}/>
      </View>
     <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            margin: 10,
          }}>
          <IconButton
          style={{margin  :5}}
          color = 'red'
            name="delete"
            size={30}
            onPress={() => Alert.alert('Konfirmasi', 'Hapus Gambar?', [{text : 'Hapus', onPress : ()=> deleteImage()}, {text  :'Batal'}])}
          />
          <IconButton
          style={{margin  :5}}
          color='blue'
            name="link"
            size={30}
            onPress={() => {
              Linking.openURL(imageItem.source);
            }}
          />
        </View>
    </View>
  )
}

export default Preview

const styles = StyleSheet.create({})