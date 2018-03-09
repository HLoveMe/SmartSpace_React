/**
 * Created by zhuzihao on 2018/3/9.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,Image
} from 'react-native';
import {connect} from "react-redux"

const style = StyleSheet.create({
    iconC:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    icon:{

    },
    nameC:{
        height:30,
        marginBottom:20,
        backgroundColor:"yellow",
        textAlign:"center",
        fontSize:17
    }
});

export class USerInfoView extends Component{
    constructor(props) {
        super(props);
        this.state={user:this.props.user}
        console.log(this.state)
    }
    componentWillReceiveProps(props){
        this.setState({user:props.user});
    }
    render(){
        return (
            <View {...this.props}>
                <View style={style.iconC}>

                </View>
                <Text style={style.nameC}>{this.state.user.name}</Text>
            </View>
        )
    }
}
