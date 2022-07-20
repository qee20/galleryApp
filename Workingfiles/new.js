import { Text, View } from 'react-native'
import React, { Component } from 'react'
import auth from '@react-native-firebase/auth';

export class App extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       initializing : true,
       user : null
    }
  }

  onAuthStateChanged(user) {
   this.setState({user : user});
    if (this.state.initializing) this.setState({initializing : false});
  }

  componentDidMount(){
    const subscriber = auth().onAuthStateChanged(this.onAuthStateChanged);
    return subscriber;
  }


  render() {
    if (this.state.initializing) return null;

  if (!this.state.user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }
    return (
       <View>
      <Text>Welcome {user.email}</Text>
    </View>
    )
  }
}

export default App