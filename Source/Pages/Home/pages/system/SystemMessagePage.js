/**
 * Created by zhuzihao on 2018/3/22.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,Image,TouchableOpacity,
} from 'react-native';
import PXHandle from "../../../../Tools/PXHandle"
import {colors} from "../../../../Tools/colors"
import Store from "../../../../ReduxReact/APPReducers"
import watch from 'redux-watch'
import {Types}  from "../../../../ReduxReact/AppTypes"
import RefreshListView,{RefreshState} from "react-native-refresh-list-view"
const styles = StyleSheet.create({
    container: {
        backgroundColor: "white",
        marginTop: PXHandle.PXHeight(9),
        flex: 1
    },
    Separator:{
        backgroundColor:colors.bkcolor,
        height:1,
        marginLeft:10
    },
    cell:{
        height:PXHandle.PXHeight(66),
        flexDirection:"row"
    },
    left:{
        width:PXHandle.PXHeight(66),
        justifyContent:"center",
        alignItems:"center"
    },
    right:{
        flex:1
    },
    status:{
        position:"absolute",
        right:10,
        top:15
    }
})
export default class SystemMessagePage extends Component{
    unSubMe = null;
    static navigationOptions = ()=>{
        return {
            title:"系统消息"
        }
    }
    constructor(props) {
        super(props);
        this.state = {
            dataList:[],
            refreshState:RefreshState.Idle,
            index:1,
            row:20
        }
    }
    _rendItemImage = (item,index)=>{
        switch (item.type){
            case 0:
            return require("../../../../../images/Home/system_info.png")
            case 1:
            return require("../../../../../images/Home/bind_request.png")
            case 2:
            return require("../../../../../images/Home/bind_info.png")
        }
    }
    _rendStateImage = (item,index)=>{
        switch (item.status){
            case 0:
                return (
                    <Image style={styles.status} source={require("../../../../../images/Home/status_0.png")}></Image>
                )
                break
            case 1:
                return (
                    <Image style={styles.status} source={require("../../../../../images/Home/status_1.png")}></Image>
                )
            case 2:
                return (
                    <Image style={styles.status} source={require("../../../../../images/Home/status_2.png")}></Image>
                )
        }
    }
    _rendItem = ({item,index})=>{
        return (
            <TouchableOpacity style={styles.cell}
                              onPress = {()=>{
                                  this.props.navigation.navigate("systemDetail",{msg:item,update:this._updateList})
                              }}
            >
                <View style={styles.left}>
                    <Image source={this._rendItemImage(item,index)}></Image>
                </View>
                <View style={styles.right}>
                    <Text style={{fontSize:17,marginTop:10}}>{item.title}</Text>
                    <Text style={{paddingRight:10,marginTop:5,fontSize:12}} numberOfLines={1}>{item.subtitle}</Text>
                    {
                        this._rendStateImage(item,index)
                    }
                </View>
            </TouchableOpacity>
        )
    }
    _renderSeparator = ()=>{
        return (
            <View style={styles.Separator}></View>
        )
    }
    _updateList = ()=>{
        this.setState({
            dataList:[].concat(this.state.dataList)
        })
    }
    componentWillMount(){
        Store.dispatch({type:Types.HomeTypes.SystemMessages,index:1,row:this.state.row});
        this.unSubMe = Store.subscribe(watch(Store.getState,"HomeReducer.SystemMessages.Messages")((_new)=>{
            index = parseInt(_new.page) + 1;
            dataList =  this.state.dataList.concat(_new.list);
            if(_new.page == _new.total_page){
                //最后一页了
                refreshState = RefreshState.NoMoreData
            }else{
                refreshState = RefreshState.Idle
            }
            this.setState({index, dataList, refreshState})
        }))

    }
    _loadNewData = ()=>{}
    _loadMoreData=()=>{
        console.log("加载更多数据")
        this.setState({refreshState:RefreshState.FooterRefreshing})
        Store.dispatch({
            type:Types.HomeReducer.SystemMessages,
            index:this.state.index,
            row:this.state.row
        })
    }
    render(){
        return (
            <View style={styles.container}>
                <RefreshListView
                    data={this.state.dataList}
                    keyExtractor = {(item,index)=>{
                        return index
                    }}
                    renderItem = {this._rendItem}
                    refreshState = {this.state.refreshState}
                    onHeaderRefresh = {this._loadNewData}
                    onFooterRefresh = {this._loadMoreData}
                    footerEmptyDataText= '-好像什么东西都没有-'
                    footerNoMoreDataText="已经没有数据了"
                    footerFailureText="点击重新加载"
                    footerRefreshingText="数据加载中"
                    style={styles.listView}
                    ItemSeparatorComponent = {
                        this._renderSeparator
                    }
                >

                </RefreshListView>
            </View>
        )
    }
    componentWillUnmount(){
        this.unSubMe();
    }
}