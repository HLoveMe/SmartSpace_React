/**
 * Created by zhuzihao on 2018/3/22.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,Image,TouchableOpacity
} from 'react-native';
import PXHandle from "../../../../Tools/PXHandle"
import {colors} from "../../../../Tools/colors"
import Store from "../../../../ReduxReact/APPReducers"
import watch from 'redux-watch'
import Button from 'apsl-react-native-button'
import {Types}  from "../../../../ReduxReact/AppTypes"
const styles = StyleSheet.create({
    container:{
        backgroundColor: "white",
        marginTop: PXHandle.PXHeight(9),
        flex: 1
    },
    content:{
        flexDirection:"row",
        paddingTop:20
    },
    part:{
        flex:1,
    },
    left:{
        paddingLeft:20,
        paddingRight:20
    },
    right:{
        paddingLeft:20,
        paddingRight:20
    }

});
export default class SystemMessageDetailPage extends Component{
    unsunb = null;
    constructor(props) {
        super(props);
        this.state={info:this.props.navigation.state.params.msg}
    }
    _operation = (status)=>{
        //SystemOperation
        Store.dispatch({
            type:Types.HomeTypes.SystemOperation,
            status,
            id:this.state.info.id
        });
        this.unsunb = Store.subscribe(watch(Store.getState,"HomeReducer.SystemMessages.Operation")((_new)=>{
            console.log(_new)
            if(_new.bind_status != this.state.info.bind_status){
                this.state.info.bind_status = _new.bind_status;
                this.state.info.time = _new.time;
                this.state.info.desc = _new.desc;
                //更新列表
                this.props.navigation.state.params.update();
                this.props.navigation.goBack();
            }
        }))
    }
    _render=()=>{
        //self.model!.type == 1 && self.model!.bind_status == 0
        if(this.state.info.type == 1 && this.state.info.bind_status == 0){
            return (
                <View style={styles.content}>
                    <View style={[styles.part,styles.left]}>
                        <Button onPress={this._operation(false)}>拒绝</Button>
                    </View>
                    <View style={[styles.part,styles.right]}>
                        <Button onPress={this._operation(true)}>同意</Button>
                    </View>
                </View>
            )
        }
        return null

    }
    render(){
        return (
            <View style={styles.container}>
                <Text>{this.state.info.desc}</Text>
                {
                    this._render()
                }
            </View>
        )
    }

}