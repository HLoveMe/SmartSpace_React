/**
 * Created by zhuzihao on 2018/3/16.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,Image,TouchableOpacity,FlatList
} from 'react-native';
import ElectricityBoxManager from "../../../Group/ElectricityBoxManager"
import ItemCell from 'react-native-item-cell'
import {Types} from "../../../../ReduxReact/AppTypes"

/**
 * 显示开关控制中的   所有设备组
 * */

const styles = StyleSheet.create({
   container:{
       flex:1,
       marginTop:10,
       backgroundColor:"white"
   }
});
export default class  SwitchGroupPage extends  Component{
    unsun = null;
    static navigationOptions = ({navigation})=> {
        return{
            title:"设备组",
        }
    };
    constructor(props) {
        super(props);
        this.state = {datas:[]}
    }
    componentDidMount(){
        this.unsun = ElectricityBoxManager.groupSubject.subscribe((datas)=>{
            if(datas==null || datas.length == 0){
                Store.dispatch({type:Types.GroupType.getGroupData});
            }
            this.setState({datas})
            console.log(datas,1111);
        })
    }
    componentWillUnmount(){
       this.unsun && this.unsun.unsubscribe();
    }
    render(){
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.datas}
                    extraData={this.state}
                    keyExtractor={(item, index)=>{
                        return item.group_name
                    }}
                    renderItem = {({item,index})=>{
                        return (
                            <ItemCell
                                children={" " + item.group_name}
                                border={{height:1}}
                                showDisclosureIndicator={true}
                                onPress = {()=>{
                                    this.props.navigation.navigate("group_switch_control",{box:item})
                                }}
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