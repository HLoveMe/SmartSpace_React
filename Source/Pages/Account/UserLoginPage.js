/**
 * Created by zhuzihao on 2018/2/27.
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
const loginStyles = StyleSheet.create({
   loginPage:{
       flex:1,
       backgroundColor:"green"
   }
});
export default class UserLoginPage extends Component{

    constructor(props) {
        super(props);
    }
    render(){
        return (
            <View style={loginStyles.loginPage}>
                <Text>AAA</Text>
            </View>
        )
    }

}