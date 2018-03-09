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
const  styles = StyleSheet.create({
   content:{
       flex:1,
       backgroundColor:"white",
       marginTop:9
   }
});

export default class DistributionGroupBoxPage extends PureComponent{
    unsubscribes = [/** unsubscribe*/];

    static navigationOptions = ({navigation})=> {
        return{
            title:"配电箱组"
        }
    };
    constructor(props) {
        super(props);
        this.state = {info:this.props.navigation.getParam("info"),datas:[]};
    }
    componentDidMount(){
        Store.dispatch({type:Types.GroupType.getGroupData});
        this.unsubscribes.push(Store.subscribe(watch(Store.getState,"GroupReducer.groupInfo")((datas)=>{
            this.setState({datas})
        })))
    }
    componentWillUnmount(){
        this.unsubscribes.map((unsubscribe)=>{
            return unsubscribe()
        })
    }
    _renderItem = ({item})=>{
        console.log(item)
        return (
            <Swipeout
                autoClose={true}
                buttonWidth = {50}
                right={[
                    {
                        text:"移除",
                        type:"delete",

                    }
                ]}
                style = {{borderColor:"red",borderWidth:1}}
                backgroundColor="white"
            >
                <View style={{height:44}}>
                    <View>
                        <Text>{item.group_name}</Text>
                    </View>
                </View>
            </Swipeout>
        )
    };
    render(){
        return (
            <View style={styles.content}>
                <ItemCell
                    icon={require("../../../images/Distribution/box_add.png")}
                    textStyle={{color:colors.navbar}}
                    iconStyle={{height:22,width:22}}
                    border={{height:0}}
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