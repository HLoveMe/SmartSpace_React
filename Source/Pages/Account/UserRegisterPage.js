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


export default class UserRegisterPage extends Component{
    constructor(props) {
        super(props);
        console.log(this.props,this.props.navigation.getParam("name"))
    }
    render(){
        return (<View></View>)
    }

}