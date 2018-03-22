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
import Types  from "../../../../ReduxReact/AppTypes"
import RefreshListView,{RefreshState} from "react-native-refresh-list-view"
const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        marginTop:PXHandle.PXHeight(9),
        flex:1
    },
    listView:{
        flex:1
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
    createTime:{
        position:"absolute",
        right:0,
        fontSize:12,
        top:5
    }
});
/**
 created:"2018.03.20 00:53:00"
 equipment_alias:"MT419B5A16"
 event:9
 event_desc:"合闸"
 id:"5aafa11e6cbcef61890252e8"
 switch_alias:null
 */
export default class BugsMessagePage extends Component{
    unSubMe = null;
    static navigationOptions = ()=>{
        return {
            title:"故障消息"
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
    componentWillMount(){
        Store.dispatch({type:"BugMessages",index:1,row:this.state.row});
        this.unSubMe = Store.subscribe(watch(Store.getState,"HomeReducer.BugMessages.Messages")((_new)=>{
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
    _rendItemImage = (item,index)=>{
        switch (item.event){
            case 1:
                return require("../../../../../images/Home/event_1.png")
            case 2:
                return require("../../../../../images/Home/event_2.png")
            case 3:
                return require("../../../../../images/Home/event_3.png")
            case 4:
                return require("../../../../../images/Home/event_4.png")
            case 5:
                return require("../../../../../images/Home/event_5.png")
            case 6:
                return require("../../../../../images/Home/event_6.png")
            case 7:
                return require("../../../../../images/Home/event_7.png")
            case 8:
                return require("../../../../../images/Home/event_8.png")
            case 9:
                return require("../../../../../images/Home/event_9.png")
            case 10:
                return require("../../../../../images/Home/event_10.png")

        }
    }
    _rendItem = ({item,index})=>{
        return (
            <View style={styles.cell}>
                <View style={styles.left}>
                    <Image source={this._rendItemImage(item,index)}></Image>
                </View>
                <View style={styles.right}>
                    <Text style={{fontSize:17,marginTop:10}}>{item.event_desc}</Text>
                    <Text style={styles.createTime}>{item.created}</Text>
                </View>
            </View>
        )
    }
    _renderSeparator = ()=>{
        return (
            <View style={styles.Separator}></View>
        )
    }
    _loadNewData = ()=>{
        // console.log("加载最新数据")
        // this.setState({refreshState:RefreshState.HeaderRefreshing})
        // Store.dispatch({
        //     type:Types.HomeReducer.Messages,
        //     index:0,
        //     row:20
        // })
    }
    _loadMoreData = ()=>{
        console.log("加载更多数据")
        this.setState({refreshState:RefreshState.FooterRefreshing})
        Store.dispatch({
            type:Types.HomeReducer.Messages,
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