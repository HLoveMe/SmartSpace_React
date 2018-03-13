/**
 * Created by zhuzihao on 2018/3/9.
 */


import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,Image,TouchableOpacity,FlatList
} from 'react-native';
import {colors} from "../../Tools/colors"
import watch from 'redux-watch'
import Store from "../../ReduxReact/APPReducers"
import ItemCell from 'react-native-item-cell'
import {Types} from "../../ReduxReact/AppTypes"
import Swipeout from 'react-native-swipeout';
import ElectricityBoxManager from "./ElectricityBoxManager"
const  styles = StyleSheet.create({
   content:{
       flex:1,
       backgroundColor:"white",
       marginTop:9
   },
    itemContainer:{
        height:44,
        borderColor:"red",
        borderWidth:1
    }
});

export default class DistributionGroupBoxPage extends PureComponent{
    unsubscribe = null;

    static navigationOptions = ({navigation})=> {
        return{
            title:"配电箱组"
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            info:this.props.navigation.getParam("info"),
            datas:[],
            row:null
        };
        console.log(this.props.navigation)
    }
    componentDidMount(){
        this.unsubscribe = ElectricityBoxManager.groupSubject.subscribe((datas)=>{
            if(datas==null || datas.length == 0){
                Store.dispatch({type:Types.GroupType.getGroupData});
            }
            this.setState({datas})
        })
    }
    componentWillUnmount(){
        this.unsubscribe.unsubscribe()
    }
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
                        onPress:()=>{this._removeItem(index)}
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
                    onPress = {()=>{
                        this.props.navigation.navigate("newgroup",{group:item});
                    }}
                    children={ item.group_name + " (" + item.count+")"}
                >

                </ItemCell>
            </Swipeout>
        )
    };

    _removeItem = (index)=>{
        Store.dispatch({
            type:Types.GroupType.removeGroup,
            re_group:this.state.datas[index],
            index:index
        })
    };

    render(){
        return (
            <View style={styles.content}>
                <ItemCell
                    icon={require("../../../images/Distribution/box_add.png")}
                    textStyle={{color:colors.navbar}}
                    iconStyle={{height:22,width:22}}
                    border={{height:0}}
                    onPress = {()=>{
                        this.props.navigation.navigate("newgroup");
                    }}
                >
                    新建设备组
                </ItemCell>
                <FlatList
                    data={this.state.datas}
                    extraData={this.state}
                    keyExtractor={(item, index)=>{
                        return item.group_name
                    }}
                    renderItem={this._renderItem}
                >

                </FlatList>
            </View>
        )
    }

}

/****
 *
 *
 * <View style={styles.itemContainer}>
 <View>
 <Text>{item.group_name}</Text>
 </View>
 </View>
 *
 *
 *
 * */