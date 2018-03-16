/**
 * Created by zhuzihao on 2018/2/27.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,Image,TouchableOpacity
} from 'react-native';

import ElectricityBoxManager from "./ElectricityBoxManager"
import {DeviceBoxGroupView} from "./views/DeviceBoxGroupView"

export default class ElectricityGroupPage extends Component{
    static navigationOptions = ({navigation})=> {
        return{
            title:"配电箱",
            headerRight:(
                <View style={{paddingRight: 15}}>
                    <TouchableOpacity onPress={() => {

                    }}>
                        <Image source={require('../../../images/Distribution/dis_add.png')} style={{width: 20, height: 20, resizeMode: 'contain'}} />
                    </TouchableOpacity>
                </View>
            )
        }
    };
    constructor(props) {
        super(props);
        this.state = {
            equipments: [],
            group_count: 0,
        }
    }
    _updateUI = (data)=>{
        this.setState({...data});
    };
    _BoxCellClick = ()=>{

    };
    componentDidMount(){
        ElectricityBoxManager.infoSubject.subscribe((data)=>{
            this._updateUI(data)
        })
    }
    render(){
        return (
            <DeviceBoxGroupView data={{...this.state}} groupClick={()=>{
                this.props.navigation.navigate("groupbox",{info:this.state})
            }}
                            eleBoxClick = {this._BoxCellClick}
            >

            </DeviceBoxGroupView>
        )
    }

}