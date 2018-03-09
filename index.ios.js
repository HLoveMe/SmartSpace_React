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
    View,
    ActivityIndicator,
    ActivityIndicatorIOS,
    ProgressBarAndroid,
    Dimensions
} from 'react-native';
import { UserInfoManager } from "./Source/Pages/Account/UserInfoManager";
import { APPLoginRouter,APPTabNavRouter } from "./Source/Pages/AppRouter"

import {initStorage} from "./Source/Tools/DataBase"
import {InterceptorManager} from "./Source/Tools/NetWork/Interceptor"
import {AutoAuthorization} from "./Source/Tools/Smart_Network/AuthInterceptor"
import {AutoURLStringization} from "./Source/Tools/Smart_Network/URLStringInterceptor"
import {ResponseResultActionManager} from "./Source/Tools/NetWork/ResponseResultAction"
import {UserPowerLostAction,ResulstMessageAction,NetworkResultAction} from "./Source/Tools/Smart_Network/ResultHandleAction"
import Store,{SagaWare}  from "./Source/ReduxReact/APPReducers"
import RootSaga from "./Source/Sagas/sagas"
import { Provider } from 'react-redux'
import watch from 'redux-watch'
import {Types} from "./Source/ReduxReact/AppTypes"
import LoadingSpinnerOverlay from 'react-native-smart-loading-spinner-overlay'
import Toast, {DURATION} from 'react-native-easy-toast'
class BlankPage extends Component{render() {return (<View></View>)}}
export default class SmartSpaceR extends Component {
    partModalLoadingSpinnerOverLay = null;
    toast = null;
    user = null;
    constructor(props) {
        super(props);
        this.state = {page:BlankPage};
    }
    componentDidMount(){
        SagaWare.run(RootSaga);
        initStorage();
        this.messageHandle();
        this.configNetWork();
        UserInfoManager.loadLocationData();
        UserInfoManager.userSubject.subscribe((user)=>{
            if(user == "Init"){return;}
            if(user == null){
                this.setState({page:APPLoginRouter})
            }else{
                //多次发生
                if(this.user==null){
                    this.setState({page:APPTabNavRouter},()=>{
                        this.loadAppShouldData();
                    });
                }
                this.user = user;
            }
        });
    }
    //npm uninstall react-native-item-cell
    //加载APP必要数据
    loadAppShouldData = ()=>{
        //更新数据
        Store.dispatch({
            type:Types.HomeTypes.MainDataUpdate
        });
        //更新数据
        Store.dispatch({
            type:Types.GroupType.UpdateGroupData
        });
    };
    messageHandle(){
        let content = "";
        let important = false;
        Store.subscribe(watch(Store.getState,"MessageReducer.showMessageInfo")((_new,old,path)=>{
            if(_new.important)
            console.log("显示提示框",_new,this.partModalLoadingSpinnerOverLay);
            if(_new.content == content){return}
            content = _new.content;
            this.partModalLoadingSpinnerOverLay.hide({delay:0,duration:0});
            this.toast.close();
            switch (_new.type){
                case Types.MessageType.loadingMessage:
                    //显示菊花
                    this.partModalLoadingSpinnerOverLay.show({
                        delay:0,
                        ..._new,
                        duration:(_new.duration == -1 || _new.duration == null) ? 255 : _new.duration
                    });
                    break;
                case Types.MessageType.textMessage:
                    this.toast.show(_new.content,_new.duration == -1 ? DURATION.FOREVER : _new.duration * 1000);
                    break;
                case Types.MessageType.loadTextMessage:
                    //显示菊花和文字
                    //暂时不显示文字
                    this.partModalLoadingSpinnerOverLay.show({
                        delay:0,
                        ..._new,
                        duration:255
                    });
                    break;
                default:
                    break
            }
        }));
        //
        Store.subscribe(watch(Store.getState,"MessageReducer.hiddenMessageInfo")((_new,old,path)=>{
            console.log("移除提示框",_new);
            this.partModalLoadingSpinnerOverLay.hide({delay:0,duration:0});
            this.toast.close();
        }))
    }
    //配置数据请求
    configNetWork(){
        InterceptorManager.addInterceptor(new AutoURLStringization("http://192.168.40.232/apiv1/"));
        InterceptorManager.addInterceptor(AutoAuthorization);
        ResponseResultActionManager.addAction(new UserPowerLostAction(()=>{
            //登入有效性丢失
            console.log("失效了")
        }));
        ResponseResultActionManager.addAction(new ResulstMessageAction((message)=>{
            //请求失败
            console.log("请求数据没得到");
            Store.dispatch({
                type:Types.MessageType.textMessage,
                content:message
            })
        }));
        ResponseResultActionManager.addAction(new NetworkResultAction());
    }
    render() {
        return (
            <Provider store={Store}>
                <View style={{flex:1}}>
                    <this.state.page onNavigationStateChange = {(prevState, newState, action)=>{
                        console.log("进行导航")
                    }}>
                    </this.state.page>
                    <LoadingSpinnerOverlay
                        ref={ component => this.partModalLoadingSpinnerOverLay = component }
                        modal={true}
                        marginTop={64}/>
                    <Toast ref={(toast)=>this.toast = toast}/>

                </View>
            </Provider>
        )
    }
}
import { Platform } from "react-native"
const  uriPrefix = Platform.OS == "android" ? "smartSpace://smartSpace/" : "smartSpace://";
const  App = ()=><SmartSpaceR uriPrefix={uriPrefix} />;
AppRegistry.registerComponent('SmartSpaceR', () => App);



