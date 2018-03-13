/**
 * Created by zhuzihao on 2018/3/13.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,Image,FlatList
} from 'react-native';
import {Types} from "../../ReduxReact/AppTypes"
import PXHandle from "../../Tools/PXHandle"
import {colors} from "../../Tools/colors"
// import watch from 'redux-watch'
// import Store from "../../ReduxReact/APPReducers"
import ItemCell from 'react-native-item-cell'
import ElectricityBoxManager from "./ElectricityBoxManager"
import CheckBox from 'react-native-checkbox';
export default class GroupAddBoxPage extends Component{
    selects = [false,false,false];
    static navigationOptions = ({navigation})=> {
        return{
            title:"增加设备",
            headerRight:(
                <View>
                    <Text style={{marginRight:10, color:"white"}} onPress={()=>{
                        navigation.state.params.addBoxs(navigation.state.params.getSureBoxs())
                        navigation.goBack();
                    }}>确定</Text>
                </View>
            )
        }
    };
    constructor(props) {
        super(props);
        this.state ={boxs:this.props.navigation.state.params.boxs}
    }
    componentWillMount() {
        this.props.navigation.setParams({
            getSureBoxs:()=>{
                return this.state.boxs.filter((V,index)=>{
                    return this.selects[index]
                })
            }
        })
    }
    render(){
        return (
            <View style={{marginTop:PXHandle.PXHeight(9)}}>
                <FlatList
                    data={this.state.boxs}
                    renderItem= {({item,index})=>{
                        return (
                            <CheckBox
                                label={item.name}
                                checked={item.select}
                                onChange={(checked) => {
                                    this.selects[index] = checked;
                                }}
                                containerStyle={{
                                    height:44,
                                    backgroundColor:"white",
                                    paddingLeft:8
                                }}
                            />
                        )
                    }}
                    keyExtractor = {(item, index) => index}
                >

                </FlatList>

            </View>
        )
    }

}