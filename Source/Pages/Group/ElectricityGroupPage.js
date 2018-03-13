/**
 * Created by zhuzihao on 2018/2/27.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,Image,TouchableOpacity
} from 'react-native';
import {Types} from "../../ReduxReact/AppTypes"
import PXHandle from "../../Tools/PXHandle"
import {colors} from "../../Tools/colors"
// import watch from 'redux-watch'
// import Store from "../../ReduxReact/APPReducers"
import ItemCell from 'react-native-item-cell'
import ElectricityBoxManager from "./ElectricityBoxManager"

const styles = StyleSheet.create({
   content:{
       flex:1,
       marginTop:PXHandle.PXHeight(9),
       backgroundColor:"white"
   },
    boxItem:{
       paddingLeft:40
    }
});

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

    componentDidMount(){
        // let data = Store.getState().GroupReducer.devideBox;
        // data && this._updateUI(data);
        // Store.subscribe(watch(Store.getState,"GroupReducer.devideBox")((_new)=>{
        //     this._updateUI(_new);
        // }));
        ElectricityBoxManager.infoSubject.subscribe((data)=>{
            this._updateUI(data)
        })
    }
    render(){
        return (
            <View style={styles.content}>
                <ItemCell
                    showDisclosureIndicator={true}
                    icon={require("../../../images/Distribution/dis_group.png")}
                    border={{height:0}} //自己加的
                    onPress = {()=>{
                        this.props.navigation.navigate("groupbox",{info:this.state})
                    }}
                >{"配电箱组 " + this.state.group_count}</ItemCell>
                <View style={{height:5,backgroundColor:colors.bkcolor}}></View>
                <ItemCell
                    icon={require("../../../images/Distribution/dis_box.png")}
                    border={{height:1}}
                    activeOpacity={1}
                >配电箱</ItemCell>
                {
                    this.state.equipments.map((V)=>{
                        return (
                            <View key={V.name} style={styles.boxItem}>
                                <ItemCell
                                    showDisclosureIndicator={true}
                                    assistComponent={()=>{
                                        if(V.is_default == 1){
                                            return (
                                                <View style={{marginRight:20}}>
                                                    <Image source={require("../../../images/Distribution/dis_lian.png")}></Image>
                                                </View>
                                            )
                                        }
                                        return null
                                    }}
                                    onPress = {(data)=>{

                                    }}
                                    data={V}
                                >{V.name}</ItemCell>
                            </View>
                        )
                    })
                }
            </View>
        )
    }

}
//rm -rf node_modiles && npm install
/**
 *
 *
 * */