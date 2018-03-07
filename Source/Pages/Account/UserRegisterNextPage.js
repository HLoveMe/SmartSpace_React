/**
 * Created by zhuzihao on 2018/3/7.
 */
/**
 * Created by zhuzihao on 2018/2/28.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import {MessageInputView} from "./views/MessageInputView"
import Button from 'apsl-react-native-button'
import PXHandle from "../../Tools/PXHandle"
import {colors} from "../../Tools/colors"
import Store from "../../ReduxReact/APPReducers"
import {Types} from "../../ReduxReact/AppTypes"
import {NetWorkManager} from "../../Tools/NetWork/NetWorkManager"
const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:"white"
    },
    inputV:{
        marginHorizontal:PXHandle.PXWidth(24),
        height:PXHandle.PXHeight(40),
        marginTop:PXHandle.PXHeight(10)
    },
    next:{
        borderRadius:0,
        marginTop:30,
        marginHorizontal:20,
        backgroundColor:colors.navbar,
        borderWidth:0,
    }
});
export default class UserRegisterNextPage extends Component{
    static navigationOptions = {
        title:"设置密码"
    };
    constructor(props) {
        super(props);
    }

    _registerUser = ()=>{
        console.log('_registerUser')
        let state = Store.getState();
        console.log(state.AccountReducer);

    };
    componentWillUnmount(){
        Store.dispatch({
            type:Types.AccountTypes.inputUserInfo,
            name:["setPassword","reSetPassword"],
            content:["",""]
        });
    }
    render(){
        return (
            <View style={styles.container}>
                <MessageInputView name="setPassword" type="2" style={styles.inputV}></MessageInputView>
                <MessageInputView name="reSetPassword" type="3" style={[styles.inputV,{marginTop:10}]}></MessageInputView>
                <Button onPress={ this._registerUser } style={styles.next} textStyle={{color:'white'}} activeOpacity={0.8}>
                    注册
                </Button>
            </View>
        )
    }

}