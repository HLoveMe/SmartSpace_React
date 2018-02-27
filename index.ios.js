/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';
import { UserInfoManager } from "./Source/Pages/Account/UserInfoManager"
import { APPLoginRouter,APPTabNavRouter } from "./Source/Pages/AppRouter"
class BlankPage extends Component{render() {return (<View></View>)}}
export default class SmartSpaceR extends Component {
  constructor(props) {
      super(props);
      this.state = {page:BlankPage};
  }
  componentDidMount(){
      UserInfoManager.userSubject.subscribe((user)=>{
          if(user == null){
              this.setState({page:APPTabNavRouter})
          }else{
              this.setState({page:APPLoginRouter})
          }
      })
  }
  render() {
    return (
        <this.state.page></this.state.page>
    )
  }
}
AppRegistry.registerComponent('SmartSpaceR', () => SmartSpaceR);


