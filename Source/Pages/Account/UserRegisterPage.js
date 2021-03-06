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
export default class UserRegisterPage extends Component{
    constructor(props) {
        super(props);
    }

    _registerNext =()=>{
        let state = Store.getState();
        if(state.AccountReducer.iphone && state.AccountReducer.code){
            this.props.navigation.navigate("registerPass");
            return
        }
        Store.dispatch({
            type:Types.MessageType.textMessage,
            content:"确认输入内容",
            duration:0.75,
        });
    };
    componentWillUnmount(){
        Store.dispatch({
            type:Types.AccountTypes.inputUserInfo,
            name:["iphone","code"],
            content:["",""]
        });
    }
    render(){
        return (
            <View style={styles.container}>
                <MessageInputView name="iphone" type="4" style={styles.inputV}></MessageInputView>
                <MessageInputView name="code" type="5" style={[styles.inputV,{marginTop:10}]}></MessageInputView>
                <Button onPress={ this._registerNext } style={styles.next} textStyle={{color:'white'}} activeOpacity={0.8}>
                    下一步
                </Button>
            </View>
        )
    }

}