/**
 * Created by zhuzihao on 2018/2/27.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class ElectricityDistributionView extends Component{
    constructor(props) {
        super(props);
console.log(this.props.style)
    }
    render(){
        return (
            <View {...this.props}>
                <Text>asa</Text>
            </View>
        )
    }
}