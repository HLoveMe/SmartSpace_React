/**
 * Created by zhuzihao on 2018/2/27.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class AppConfigPage extends Component{
    static navigationOptions = {
        title:"用户"
    };
    constructor(props) {
        super(props);

    }
    render(){
        return (
            <View>
                <Text>AppConfigPage</Text>
            </View>
        )
    }

}