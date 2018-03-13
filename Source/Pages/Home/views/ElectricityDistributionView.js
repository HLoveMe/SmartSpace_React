/**
 * Created by zhuzihao on 2018/2/27.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';
import PropTypes from 'prop-types';
import PXHandle from "../../../Tools/PXHandle"
import {colors} from "../../../Tools/colors"
import {connect} from "react-redux"
import fecha from "fecha"

const styles = StyleSheet.create({
    titleLabel:{
        textAlign:"center",
        fontSize:16,
        color:"white",
        marginTop:PXHandle.PXHeight(9)
    },
    yes_today_Label:{
        color:"white",
        fontSize:12,
        paddingLeft:PXHandle.PXWidth(12),
        lineHeight:PXHandle.PXHeight(17),
        height:PXHandle.PXHeight(17),
    },
    chartView:{
        position:"absolute",
        bottom:PXHandle.PXHeight(120),
        left:0,
        right:0,
        height:PXHandle.PXHeight(175),
    },
    descView:{
        position:"absolute",
        bottom:0,
        left:0,
        right:0,
        height:PXHandle.PXHeight(120),
    },
    descViewGroup:{
        flex:1,
        // borderWidth:1,
        // borderColor:"orange",
        flexDirection:"row",
        // alignItems:"stretch"
    },
    descViewUpdate:{
        color:"white",
        height:PXHandle.PXHeight(20),
        lineHeight:PXHandle.PXHeight(20),
        textAlign:"center",
        fontSize:13
    },
    descViewPart:{
        flex:1,
        flexDirection:"row",
    },
    descViewPartLeft:{
        flex:1,
        justifyContent:"center",
        alignItems:"center"
    },
    descViewPartRight:{
        flex:1,
        justifyContent:"center"
    }
});

class _ElectricityDistributionView extends Component{
    constructor(props) {
        super(props);
        console.log(props)

    }
    _content = (index)=>{
        let model =  this.props.data
        switch (index){
            case 0:
                return model.pressure + "V";
            case 1:
                return model.electric + "A";
            case 2:
                return (model.pressure * model.electric) + "W";
            case 3:
                return model.temperature + "℃";
            case 4:
                return model.lostElectric + "A"
            case 5:
                return "￥" + model.today * model.price
            default:
                return ""
        }
    };
    render(){
        let model = this.props.data;
        return (
            <View {...this.props} style={{position:"relative",backgroundColor:colors.navbar}}>
                <Text style={styles.titleLabel}>{model.title}</Text>
                <Text style={styles.yes_today_Label}>
                    昨日电费:￥{model.yesterday * model.price}
                </Text>
                <Text style={styles.yes_today_Label}>
                    今日电费:￥{model.today * model.price}
                </Text>
                <View style={styles.chartView}>

                </View>
                <View style={styles.descView}>
                    {
                        [["电压","电流"],
                            ["功率","温度"],
                            ["漏电","电费"]].map((value,index)=>{
                            return (
                                <View key={index} style={styles.descViewGroup}>
                                    {
                                        //[["电压","pressure"],["电流","electric"]]
                                        value.map((_value,_index)=>{
                                            //["漏电","lostElectric"]
                                            return (
                                                <View key={_index} style={styles.descViewPart}>
                                                    <View style={styles.descViewPartLeft}>
                                                        <Text style={{color:"white",fontSize:14}}>{_value}</Text>
                                                    </View>
                                                    <View style={styles.descViewPartRight}>
                                                        <Text style={{color:"white",fontSize:20}}>
                                                            {
                                                                this._content((index * 2) + _index)
                                                            }
                                                            </Text>
                                                    </View>
                                                </View>
                                            )
                                        })
                                    }
                                </View>
                            )
                        })
                    }
                    <Text style={styles.descViewUpdate}>数据刷新时间:{fecha.format(model.time,"YYYY-MM-DD hh:mm")}</Text>
                </View>
            </View>
        )
    }
}

_ElectricityDistributionView.propTypes = {
    height:PropTypes.number.isRequired,
    data:PropTypes.any.isRequired,
};

const mapStateToProps =(state,props)=>{
    console.log(state,props)
    return {...props,A:111}
};

export default ElectricityDistributionView = connect(mapStateToProps)(_ElectricityDistributionView)