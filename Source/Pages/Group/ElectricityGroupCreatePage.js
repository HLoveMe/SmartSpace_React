/**
 * Created by zhuzihao on 2018/3/12.
 */

import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,Image,TouchableOpacity,TextInput,FlatList
} from 'react-native';
import {Types} from "../../ReduxReact/AppTypes"
import PXHandle from "../../Tools/PXHandle"
import {colors} from "../../Tools/colors"
import ItemCell from "react-native-item-cell"
import Swipeout from 'react-native-swipeout';
import Store from "../../ReduxReact/APPReducers"
import watch from 'redux-watch'
import ElectricityBoxMananger from "./ElectricityBoxManager"
const styles = StyleSheet.create({
   headerLeft:{
       marginLeft:10,
       color:"white"
   },
    headerRight:{
        marginRight:10,
        color:"white"
    }
});

export default class ElectricityGroupCreatePage extends PureComponent{
    unsub = null;
    unbox = null;
    uncreate = null;
    static navigationOptions = ({navigation})=> {
        return{
            title:navigation.state.group  == null ? "新建配电箱组" : "设置设备组",
            headerLeft:(
                <View>
                    <Text style={styles.headerLeft} onPress={()=>{
                        navigation.goBack();
                    }}>取消</Text>
                </View>
            ),
            headerRight:(
                <View>
                    <Text style={styles.headerRight} onPress={()=>{
                        navigation.state.params.createGroup()
                    }}>确定</Text>
                </View>
            )
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            group: this.props.navigation.state.params != null ? this.props.navigation.state.params.group : null,
            editGroupInfo:null,
            //group为简单的组信息  editGroupInfo为该组的相信信息
            row:-1,
            boxs:{},//该用户所有配电箱
            selects:[],//已选
            name:this.props.navigation.state.params != null ? this.props.navigation.state.params.group.group_name : ""
        };
    }
    componentWillMount(){
        this.props.navigation.setParams({
            createGroup:this._sureCreateGroup
        });
        if(this.state.group){
            //为修改某个组信息
            Store.dispatch({
                type:Types.GroupType.oneGroupDetail,
                id:this.state.group.id
            });
            this.unsub = Store.subscribe(watch(Store.getState,"GroupReducer.oneGroupDetail")((_new)=>{
                this.setState({editGroupInfo:_new.editGroupInfo});
                this.setState({selects:_new.editGroupInfo.equipment_in});
            }))
        }
        this.unbox =  ElectricityBoxMananger.infoSubject.subscribe((boxs)=>{
            this.setState({boxs})
        })
        this.uncreate = Store.subscribe(watch(Store.getState,"GroupReducer.createGroupResult")((_new)=>{
            let info = _new.info;
            if(info.success){
                setTimeout(()=>{
                    Store.dispatch({
                        type:Types.GroupType.getGroupData
                    });
                    Store.dispatch({
                        type:Types.GroupType.UpdateGroupData
                    });
                    this.props.navigation.goBack();
                },750)
            }
        }))

    }
    componentWillUnmount(){
        this.unsub && this.unsub();
        this.uncreate && this.uncreate();
        this.unbox && this.unbox.unsubscribe();
    }
    _sureCreateGroup = ()=>{
        if(this.state.name.length == 0){

            Store.dispatch({
                type:Types.MessageType.textMessage,
                content:"输入名称"
            });
            return
        }
        if(this.state.group == null){
            //创建
            Store.dispatch({
                type:Types.GroupType.createGroup,
                group_name:this.state.name,
                equipment_ids:this.state.selects.map((V)=>{
                    return V.equipment_id
                })
            })
        }else{
            //修改
        }
    }
    _removeItem = (item,index)=>{
        let selects = this.state.selects.filter((V)=>{
            return V.equipment_id != item.equipment_id
        })
        this.setState({selects});
    };
    _renderItem = ({item,index})=>{
        return (
            <Swipeout
                autoClose={true}
                buttonWidth = {50}
                sectionID ={0}
                rowID = {index}
                right={[
                    {
                        text:"移除",
                        type:"delete",
                        onPress:()=>{this._removeItem(item,index)}
                    }
                ]}
                index = {index}
                onOpen={(sec,row)=>{
                    this.setState({row})
                }}
                close={ index != this.state.row }
                backgroundColor="white"
            >
                <ItemCell
                    children={ item.name }
                >

                </ItemCell>
            </Swipeout>
        )
    }
    render(){
        return (
            <View style={{flex:1}}>
                <View style={{marginTop:PXHandle.PXHeight(9)}}>
                    <Text style={{height:25,lineHeight:25,marginLeft:5}}>设备组名称</Text>
                </View>
                <View style={{height:44,backgroundColor:"white",justifyContent:"center"}}>
                    <TextInput
                               clearButtonMode={"unless-editing"}
                               defaultValue={this.state.group != null ? this.state.group.group_name : ""}
                               placeholder={"输入设备组名称"}
                               style={{paddingHorizontal:5}}
                               onChangeText={(text)=>{
                                   this.setState({name:text})
                               }}
                    ></TextInput>
                </View>
                <View>
                    <Text style={{height:40,lineHeight:40,marginLeft:5}}>设备 ({this.state.selects.length || 0})</Text>
                </View>
                <ItemCell
                    icon={require("../../../images/Distribution/box_add.png")}
                    textStyle={{color:colors.navbar}}
                    iconStyle={{height:22,width:22}}
                    border={{height:0}}
                    onPress = {()=>{
                        if(this.state.group != null){
                            if(this.state.editGroupInfo == null){return;}
                        }
                        this.props.navigation.navigate("groupaddbox",{
                            boxs:this.state.boxs.equipments.filter((V)=>{
                                return  this.state.selects.filter((_V)=>{
                                    return _V.equipment_id == V.equipment_id
                                }).length == 0
                            }),
                            addBoxs:(boxs)=>{
                                this.setState({selects:this.state.selects.concat(boxs)})
                            }
                        })
                    }}
                >
                    添加分组
                </ItemCell>
                <FlatList
                    data={this.state.selects }
                    renderItem= {this._renderItem}
                    keyExtractor = {(item, index) => index}
                >

                </FlatList>
            </View>
        )
    }
}