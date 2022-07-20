import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MenuUtama from './MenuUtama';
import Upload from './Upload';
import Icons from 'react-native-vector-icons/Ionicons'
import Preview from './Preview';



const HomeStack = createNativeStackNavigator();
const UploadStack = createNativeStackNavigator();
const TabTor = createBottomTabNavigator();

function StackHome() {
  return(
     <HomeStack.Navigator >
      <HomeStack.Screen options={{title :'Your Album', headerTitleAlign : 'center'}} name='Home' component={MenuUtama}/>
      <HomeStack.Screen options={{title :'Pratinjau', headerTitleAlign : 'center'}} name='Preview' component={Preview}/>
    </HomeStack.Navigator>
  )
}
function StackUpload() {
  return(
     <UploadStack.Navigator >
      <UploadStack.Screen options={{title :'Unggah Gambar Anda', headerTitleAlign : 'center'}} name='Upload' component={Upload}/>
    </UploadStack.Navigator>
  )
}

const MainApp = () => {
  return (
   <NavigationContainer>
    <TabTor.Navigator 
     screenOptions={({route})=>({
      tabBarIcon: ({focused, color, size}) => {
            let iconName;

            if (route.name === 'HomeTab') {
              iconName = focused ? 'home' : 'home-outline';
            } else if (route.name === 'AddTab') {
              iconName = focused ? 'menu' : 'menu';
            } else if (route.name === 'UploadTab') {
              iconName = focused ? 'cloud-upload' : 'cloud-upload-outline';
            }

            // You can return any component that you like here!
            return <Icons name={iconName} size={size} color={color} />;
          },
      headerShown : false
     })}
    >
      <TabTor.Screen options={{tabBarLabel : 'Home'}} name='HomeTab' component={StackHome}/>
      <TabTor.Screen options={{tabBarLabel : 'Unggah'}} name='UploadTab' component={StackUpload}/>
    </TabTor.Navigator>
   </NavigationContainer>
  )
}

export default MainApp

const styles = StyleSheet.create({})