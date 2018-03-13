/**
 * Created by zhuzihao on 2018/2/27.
 */
import React, { PureComponent } from 'react';
import {
    StyleSheet,
    Text,
    View,FlatList
} from 'react-native';
import PXHandle from "../../Tools/PXHandle"
import {USerInfoView} from "./views/USerInfoView"
import {UserInfoManager} from "../Account/UserInfoManager"
import ItemCell from 'react-native-item-cell'
import {colors} from "../../Tools/colors"
const styles = StyleSheet.create({
   container:{
       flex:1,
       backgroundColor:"white"
   },
    userStyle:{
        height:PXHandle.PXHeight(207)
    }
});
export default class AppConfigPage extends PureComponent{
    static navigationOptions = {
        title:"用户"
    };
    settings = [
        ["配电箱账号管理",require("../../../images/User/my_icon_0.png")],
        ["电价预设",require("../../../images/User/my_icon_1.png")],
        ["设备报修",require("../../../images/User/my_icon_2.png")],
        ["功能教程",require("../../../images/User/my_icon_3.png")],
        ["说明书",require("../../../images/User/my_icon_4.png")],
        ["设置",require("../../../images/User/my_icon_5.png")]];
    constructor(props) {
        super(props);
        this.state = {user:{}};
    }
    componentDidMount(){
        UserInfoManager.userSubject.subscribe((user)=>{
            this.setState({user:user})
        });
    }
    _onPress = (index)=>{
        switch (index){
            case 0:
                break
            case 1:
                break
            case 2:
                break
            case 3:
                break
            case 4:
                break
            case 5:
                this.props.navigation.navigate("appSetting");
                break
            default:
                break
        }
    };
    render(){
        return (
            <View style={styles.container}>
                <USerInfoView style={styles.userStyle} user={this.state.user}>
                </USerInfoView>
                <View style={{height:8,backgroundColor:colors.bkcolor}}></View>
                <FlatList
                    data={this.settings}
                    keyExtractor = {(item, index) => index}
                    renderItem = {
                        ({item,index})=>{
                            return (
                                <ItemCell
                                    icon={item[1]}
                                    border={{height:1}}
                                    activeOpacity={1}
                                    showDisclosureIndicator = {true}
                                    onPress = {this._onPress}
                                    data={index}
                                >
                                    {item[0]}
                                </ItemCell>
                            )
                        }
                    }

                >
                </FlatList>
            </View>
        )
    }

}