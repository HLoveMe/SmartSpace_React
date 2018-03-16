/**
 * Created by zhuzihao on 2018/3/16.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View,Image,TouchableOpacity
} from 'react-native';
import PXHandle from "../../../Tools/PXHandle"
import {colors} from "../../../Tools/colors"
import ItemCell from 'react-native-item-cell'

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
import PropTypes from 'prop-types';
//显示设备
export class DeviceBoxGroupView extends Component {
    constructor(props) {
        super(props);
        /***
         *      groupClick   点击顶部设备组
         *
         *
         *      eleBoxClick  电箱点击
         *
         *      data{equipments,group_count}
         * */
        this.state = {
            equipments: this.props.data.equipments || [],
            group_count: this.props.data.group_count || 0
        };
    }

    componentWillReceiveProps(props) {
        this.setState({
            equipments: props.data.equipments || [],
            group_count: props.data.group_count || 0
        });
    }

    render() {
        return (
            <View style={styles.content}>
                <ItemCell
                    showDisclosureIndicator={true}
                    icon={require("../../../../images/Distribution/dis_group.png")}
                    border={{height: 0}} //自己加的
                    onPress={ ()=> {
                        this.props.groupClick && this.props.groupClick()
                    } }
                >{"配电箱组 " + this.state.group_count}</ItemCell>
                <View style={{height: 5, backgroundColor: colors.bkcolor}}></View>
                <ItemCell
                    icon={require("../../../../images/Distribution/dis_box.png")}
                    border={{height: 1}}
                    activeOpacity={1}
                >配电箱</ItemCell>
                {
                    this.state.equipments.map((V)=> {
                        return (
                            <View key={V.name} style={styles.boxItem}>
                                <ItemCell
                                    showDisclosureIndicator={true}
                                    assistComponent={()=> {
                                        if (V.is_default == 1 && this.props.showDefaultIcon) {
                                            return (
                                                <View style={{marginRight: 20}}>
                                                    <Image
                                                        source={require("../../../../images/Distribution/dis_lian.png")}></Image>
                                                </View>
                                            )
                                        }
                                        return null
                                    }}
                                    onPress={()=> {
                                        this.props.eleBoxClick && this.props.eleBoxClick();
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
DeviceBoxGroupView.defaultProps = {
    showDefaultIcon:true
}
DeviceBoxGroupView.propTypes = {
    groupClick:PropTypes.func,
    eleBoxClick:PropTypes.func,
    data:PropTypes.any.isRequired,
    showDefaultIcon:PropTypes.bool
}