/**
 * Created by zhuzihao on 2018/3/16.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,Image,TouchableOpacity
} from 'react-native';
import {DeviceBoxGroupView} from "../../../Group/views/DeviceBoxGroupView"
import ElectricityBoxManager from "../../../Group/ElectricityBoxManager"
export  default class SwitchBoxGroupPage extends Component{
    unsub = null;
    static navigationOptions = ({navigation})=> {
        return{
            title:"设备",
        }
    };

    constructor(props) {
        super(props);
        this.state = {
            equipments: [],
            group_count: 0,
        }
    }
    componentDidMount(){
        this.unsub = ElectricityBoxManager.infoSubject.subscribe((data)=>{
            this.setState({...data});
        })
    }
    componentWillUnmount(){
        this.unsub && this.unsub.unsubscribe();
    }
    render(){
        return (
            <DeviceBoxGroupView data={{...this.state}} groupClick={()=>{
                this.props.navigation.navigate("all_devide_group")
            }}
                                showDefaultIcon={false}
            >
            </DeviceBoxGroupView>
        )
    }
}