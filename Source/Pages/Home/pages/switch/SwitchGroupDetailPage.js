/**
 * Created by zhuzihao on 2018/3/16.
 */


/**
 * 设备组的总开关 和包含的配电箱
 * */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,Image,TouchableOpacity,FlatList,Switch
} from 'react-native';
import ItemCell from 'react-native-item-cell'
import PXHandle from "../../../../Tools/PXHandle"
import Store from "../../../../ReduxReact/APPReducers"
import watch from "redux-watch"
import {Types} from "../../../../ReduxReact/AppTypes"
const  styles = StyleSheet.create({
    coninter:{
        flex:1,
        backgroundColor:"white",
        marginTop:PXHandle.PXHeight(9)
    }
})
export  default  class SwitchGroupDetailPage extends Component{
    unsun = null;
    statusun = null;
    static navigationOptions = ({navigation})=> {
        return{
            title:"开关控制",
        }
    };
    constructor(props){
        super(props);
        this.state = {
            value:false,
            box:this.props.navigation.state.params.box || {},
            boxDetail:null,
        }
    }
    componentWillMount(){
        Store.dispatch({
            type:Types.HomeTypes.SwitchGetGroupDetail,
            id:this.state.box.id
        });
        this.unsun = Store.subscribe(watch(Store.getState,"GroupReducer.oneGroupDetail")((_new)=>{
            console.log(_new);
            this.setState({
                boxDetail:_new.editGroupInfo,
                value:_new.editGroupInfo.status == 1
            })
        }));
        this.statusun = Store.subscribe(watch(Store.getState,"HomeReducer.SwitchControl.GroupSwitchResult")((_new)=>{
            this.setState({value:!this.state.value})
        }));
    }
    componentWillUnmount(){
        this.unsun && this.unsun();
        this.statusun && this.statusun();
    }
    render(){
        if(this.state.boxDetail == null){return (<View style={styles.coninter}></View>)}
        return (
            <View style={styles.coninter}>
                <ItemCell
                    showDisclosureIndicator={true}
                    assistComponent={()=> {
                        return (
                            <View style={{paddingRight:15}}>
                                <Switch onValueChange={(value)=>{
                                    this.setState({value})
                                    Store.dispatch({
                                        type:Types.HomeTypes.SwitchGroupChange,
                                        id:this.state.box.id,
                                        status:value
                                    })
                                }} value={this.state.value}></Switch>
                            </View>
                        )
                    }}
                    icon={require("../../../../../images/Distribution/dis_group.png")}
                    children={this.state.box.group_name}
                ></ItemCell>
                <FlatList
                    data={this.state.boxDetail.equipment_in}
                    extraData={this.state}
                    keyExtractor={(item, index)=>{
                        return index
                    }}
                    renderItem = {({item,index})=>{
                        return (
                            <ItemCell
                                children={" " + item.name}
                                border={{height:1}}
                                showDisclosureIndicator={true}
                            >

                            </ItemCell>
                        )
                    }}
                >
                </FlatList>
            </View>
        )
    }
}