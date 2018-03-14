/**
 * Created by zhuzihao on 2018/3/9.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,Image
} from 'react-native';

import PXHandle from "../../../Tools/PXHandle"

const iconWH = PXHandle.PXHeight(91);
const style = StyleSheet.create({
    iconC:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    icon:{
        width:iconWH,
        height:iconWH,
        backgroundColor:"yellow",
        borderRadius:iconWH/2,
    },
    nameC:{
        height:30,
        marginBottom:20,
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
        console.log(props)
    }
    render(){
        return (
            <View {...this.props}>
                <View style={style.iconC}>
                    <Image style={style.icon} source={{uri:this.state.user.headimgurl}}>

                    </Image>
                </View>
                <Text style={style.nameC}>{this.state.user.name}</Text>
            </View>
        )
    }
}
