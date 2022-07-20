import { FlatList, Image, StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React, {useEffect, useState} from 'react'
import rtdb from '@react-native-firebase/database'
import moment from 'moment'

const MenuUtama = ({navigation}) => {
  const [dataIMMg, setdataIMMg] = useState([])

useEffect(() => {
      console.log("Get data");
 rtdb().ref(`/GaleriKu/`)
  .orderByChild('timestamp')
  .on('value', snapshot => {
    const data = [];
     snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          data.push(childData);
        });
    setdataIMMg(data);
   console.log('Image data: ', data); 
});
    }, [])

    const renderItem = ({item, index}) => {
    return (
      <View>
        <TouchableOpacity
          style={styles.item}
          onPress={()=> navigation.navigate('Preview', {imageItem : item})}
          >
          <Image
            style={styles.image}
            resizeMode="cover"
            source={{uri: item.source}}
          />
          <Text style={styles.text}>{item.caption}</Text>
          <Text style={styles.text}>{moment(item.timestamp).format('dddd, DD MMMM YYYY')}</Text>
        </TouchableOpacity>
      </View>
    );
  };

 const EMPT = ()=>{
  return(
    <View style={{flex  :1, justifyContent : 'center', alignContent : 'center', alignItems : 'center'}}>
      <Text>Data Gambar Belum Ada , Mulai mengunggah foto pada Tab Unggah</Text>
    </View>
  )
 }
  
  return (
    <View style={styles.container}>
      <FlatList
      numColumns={2}
        style={styles.container}
        data={dataIMMg}
        renderItem={renderItem}
        keyExtractor={item => `key-${item.timestamp}`}
        ListEmptyComponent={EMPT}
      />
    </View>
  )
}

export default MenuUtama

const styles = StyleSheet.create({
  containerpre: {
    alignItems: 'center',
  },
  container: {
    flex  :1
  },
  noImage: {
    borderWidth: 2,
    width: 120,
    height: 120,
    marginTop: 5,
    marginBottom: 5,
    borderRadius: 10,
  },
  item: {
    padding: 4,
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    margin : 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  image: {
    width: 160,
    height: 100,
    borderRadius: 5,
  },
  text: {
    color: 'black',
    fontWeight: 'bold',
    marginTop: 10,
  },
  fixToText: {margin: 5},
});