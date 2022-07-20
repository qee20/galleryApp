import { Text, StyleSheet, View, TextInput, Button, Alert, SafeAreaView, ScrollView, FlatList, TouchableHighlight } from 'react-native'
import React, { Component } from 'react'
import database from '@react-native-firebase/database'

export default class App extends Component {
  constructor(props){
    super(props)
    this.state={
      kodeBarang : '',
      merkBarang : '',
hargaBarang : 0,
jumlahBarang : 0,
dataBarang : [],
    }
  }

tambah(){
  const id = 'BRG' + Date.now()
database().ref('/Aksesoris/'+ id).set({
  kodeBarang : id,
  merkBarang : this.state.merkBarang,
  hargaBarang : this.state.hargaBarang,
  jumlahBarang : this.state.jumlahBarang
}).then(()=>{
Alert.alert('Info', 'Berhasil Menambahkan Barang !', [{text : 'Ok'}])
}).catch((e)=> console.log(e))
    }

    delete({item}){
      Alert.alert('Konfirmasi', `Hapus Barang ${item.merkBarang}?`, [{text : 'Ya', onPress : ()=>  database().ref('/Aksesoris/'+ item.kodeBarang).remove().then(()=> Alert.alert('Info', 'Berhasil Dihapus !', [{text : 'Ok'}])).catch(e=> console.log(e))}, {text : 'Batal', onPress : ()=> console.log('Batal')}])
    }

    componentDidMount(){
      database().ref('/Aksesoris').on('value',snapshot=> {
        console.log('Data : ', snapshot.val());
        const data = [];
        snapshot.forEach((childSnapshot) => {
          const childKey = childSnapshot.key;
          const childData = childSnapshot.val();
          data.push(childData);
        });
        this.setState({
          dataBarang : data
        })
        console.log(this.state.dataBarang);
      })
    }

  render() {
    return (
      <View>
        <Text style={{textAlign : 'center', fontSize : 20, margin : 5, fontWeight : 'bold'}}>Daendel's Accessories Stock </Text>
        <Text style={{marginLeft : 10}}>'Silahkan Kelola Barang '</Text>
        <TextInput style={styles.input} placeholder='Masukkan Merk Barang' onChangeText={(value)=> this.setState({merkBarang : value})} />
        <TextInput style={styles.input} placeholder='Masukkan Harga Barang' onChangeText={(value)=> this.setState({hargaBarang : value})} />
        <TextInput style={styles.input} placeholder='Masukkan Jumlah Barang' onChangeText={(value)=> this.setState({jumlahBarang : value})} />
       <View style={{margin : 10}}>
          <Button onPress={this.tambah.bind(this)} title='Tambah'/>
       </View>
       <FlatList
        data={this.state.dataBarang}
        renderItem={({ item }) => (
           <View style={{flex : 1, flexDirection : 'row', margin : 5, borderWidth : 2, borderColor : 'blue'}}>
            <View style={{justifyContent : 'center', borderWidth : 2, borderColor : 'blue'}}>
               <Text style={{margin : 5}}>{item.kodeBarang}</Text>
               <TouchableHighlight onPress={this.delete.bind(this, {item})} style={{borderWidth : 2, borderRadius : 5, margin : 3, backgroundColor : '#F47C7C'}} >
                 <Text style={{textAlign : 'center', color : 'white', fontWeight : 'bold'}}>Hapus</Text>
               </TouchableHighlight>
            </View>
             <View style={{flexDirection : 'column', marginLeft : 10}}>
               <Text>Merk : {item.merkBarang}</Text>
             <Text>Harga : {item.hargaBarang}</Text>
             <Text>Jumlah : {item.jumlahBarang}</Text>
             </View>
           </View>
        )}
        keyExtractor={item => item.kodeBarang}
      />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  input : {
    borderWidth : 2,
    borderColor : 'black',
    margin : 5,
    borderRadius : 5
  }
})