/**
 * Created by zhuzihao on 2018/2/27.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export class MainFunView extends  Component{
    constructor(props) {
        super(props);

    }
    render(){
        return (
            <View {...this.props}>
                <Text>FUnc</Text>
            </View>
        )
    }

}