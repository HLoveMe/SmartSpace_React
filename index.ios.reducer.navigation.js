/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { UserInfoManager } from "./Source/Pages/Account/UserInfoManager";
import { APPLoginRouter,APPTabNavRouter } from "./Source/Pages/AppRouter"
import {initStorage} from "./Source/Tools/DataBase"
import {InterceptorManager} from "./Source/Tools/NetWork/Interceptor"
import {AutoAuthorization} from "./Source/Tools/Smart_Network/AuthInterceptor"
import {ResponseResultActionManager} from "./Source/Tools/NetWork/ResponseResultAction"
import {UserPowerLostAction,ResulstMessageAction,NetworkResultAction} from "./Source/Tools/Smart_Network/ResultHandleAction"
// import Store  from "./Source/ReduxReact/APPReducers"
import { Provider } from 'react-redux'
class BlankPage extends Component{render() {return (<View></View>)}}
// ReduxLoginNavigation
import {ReduxLoginNavigation} from "./Source/ReduxReact_Navigator/navigator/ReduxLoginNavigation"
import Store from "./Source/ReduxReact_Navigator/APPReducers"
export default class SmartSpaceR extends Component {
    constructor(props) {
        super(props);
        this.state = {page:BlankPage};
    }
    componentDidMount(){
        initStorage();
        this.configNetWork();
        UserInfoManager.loadLocationData();
        UserInfoManager.userSubject.subscribe((user)=>{
            if(user == "Init"){return;}
            if(user == null){
                this.setState({page:ReduxLoginNavigation})
            }else{
                this.setState({page:APPTabNavRouter})
            }
        });
        console.log(Store)
    }
    //配置数据请求
    configNetWork(){
        InterceptorManager.addInterceptor(AutoAuthorization);
        ResponseResultActionManager.addAction(new UserPowerLostAction(()=>{
            //登入有效性丢失
            console.log("失效了")
        }));
        ResponseResultActionManager.addAction(new ResulstMessageAction((message)=>{
            //请求失败
            console.log("请求数据没得到");
        }));
        ResponseResultActionManager.addAction(new NetworkResultAction());
    }
    render() {
        return (
            <Provider store={Store}>
                <this.state.page></this.state.page>
            </Provider>
        )
    }
}

AppRegistry.registerComponent('SmartSpaceR', () => SmartSpaceR);


