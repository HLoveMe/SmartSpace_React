/**
 * Created by zhuzihao on 2018/1/17.
 */
import React, { Component } from 'react';
import { StyleSheet, View,Image ,TouchableOpacity,Text,TextInput} from 'react-native';
import PropTypes from 'prop-types';

const PasswordInputStyle = StyleSheet.create({
    container:{
        backgroundColor:"white",
        paddingHorizontal:15,

    },
    input:{
        height:"100%",
        width:"100%",
        paddingRight:40,
        borderBottomWidth:1,
        borderBottomColor:"#f5f5f5"
    },
    enter:{
        position:"absolute",
        height:"100%",
        width:40,
        top:0,
        right:15,
        justifyContent:"center",
        alignItems:"center"
    }
});
export default class PasswordInputView extends Component{
    constructor(ops){
        super(ops)
        this.state ={
            secureTextEntry:true,
        }
    }
    render(){
        return (
            <View  style = {[this.props.style,PasswordInputStyle.container]}>
                <TextInput {...this.props} style={ PasswordInputStyle.input }
                           placeholder={this.props.placeholder}
                           secureTextEntry={this.state.secureTextEntry}
                >

                </TextInput>
                <TouchableOpacity style = { PasswordInputStyle.enter }
                                  onPress ={()=>{
                                      this.setState({
                                          secureTextEntry:!this.state.secureTextEntry
                                      })
                                  }}
                >
                    <Image source={
                        this.state.secureTextEntry ? require("../../../images/password_nor.png") : require("../../../images/password.png")
                    }>

                    </Image>
                </TouchableOpacity>
            </View>
        )
    }

}

PasswordInputView.defaultProps = {
    placeholder:"密码"
};

PasswordInputView.propTypes = {
    placeholder:PropTypes.string
};