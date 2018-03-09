/**
 * Created by zhuzihao on 2018/2/27.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import PXHandle from "../../Tools/PXHandle"
import {USerInfoView} from "./views/USerInfoView"
import {UserInfoManager} from "../Account/UserInfoManager"
const styles = StyleSheet.create({
   container:{
       flex:1,
       backgroundColor:"white"
   },
    userStyle:{
        height:PXHandle.PXHeight(207),
        backgroundColor:"red"
    }
});
export default class AppConfigPage extends Component{
    static navigationOptions = {
        title:"用户"
    };
    constructor(props) {
        super(props);
        this.state = {user:{}};
    }
    componentDidMount(){
        UserInfoManager.userSubject.subscribe((user)=>{
            this.setState({user:user})
        });
    }
    render(){
        return (
            <View style={styles.container}>
                <USerInfoView style={styles.userStyle} user={this.state.user}>

                </USerInfoView>
            </View>
        )
    }

}