/**
 * Created by zhuzihao on 2018/2/27.
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Text,
    View
} from 'react-native';

export default class ElectricityGroupPage extends Component{
    static navigationOptions = {
        title:"配电箱"
    };
    constructor(props) {
        super(props);

    }
    render(){
        return (
            <View>
                <Text>Group page</Text>
            </View>
        )
    }

}