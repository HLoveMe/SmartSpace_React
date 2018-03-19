/**
 * Created by zhuzihao on 2018/3/15.
 */

import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import PXHandle from "../../Tools/PXHandle"
import {colors} from "../../Tools/colors"
import ElectricityBoxMananger from "../Group/ElectricityBoxManager"
import {RadioGroup, RadioButton} from 'react-native-flexi-radio-button'
const styles = StyleSheet.create({
    container:{
        backgroundColor:"white",
        marginTop:PXHandle.PXHeight(9),
        flex:1,

    }
})
export default class DefaultDeviceChangePage extends Component{
    constructor(props) {
        super(props);
        this.state = {...this.props.navigation.state.params,info:null,index:0}
    }
    componentWillMount(){
        ElectricityBoxMananger.infoSubject.subscribe((info)=>{
            this.setState({info});
            if(info != null){
                index = 0
                for (var _index = 0 ;_index < info.equipments.length;_index++){
                    let V = info.equipments[_index]
                    if(V.is_default == 1){
                        index = _index
                        break
                    }
                }
                this.setState({index})
            }

        })
    }

    render(){
        return (
            <View style = {styles.container}>
                {
                    this.state.info ? (
                        <RadioGroup
                            size={24}
                            thickness={2}
                            color='#9575b2'
                            highlightColor='white'
                            selectedIndex={
                                this.state.index
                            }
                            onSelect = {(index, value) => {
                                console.log(value)
                            }}
                        >
                            {
                                this.state.info.equipments.map((V,index)=>{
                                    return (
                                        <RadioButton value={V.equipment_id} key={V.name} style={{borderBottomWidth:1,borderColor:"#ccc8b9"}}>
                                            <Text style={{marginLeft:10}}>{V.name}</Text>
                                        </RadioButton>
                                    )
                                })
                            }
                        </RadioGroup>
                    ) : null
                }
            </View>
        )
    }
}