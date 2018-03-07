import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
const styles = {
    tab:{
        height:49,
        backgroundColor:'transparent',
        flexDirection:'row',
        borderTopColor:"#999999",
        borderTopWidth:1,
        position:"relative"
    },
    tabItem:{
        alignItems:'center',
        justifyContent:'center',
        flex:1
    }
};

export default class TabBar extends Component {
    constructor(props) {
        super(props);
        console.log(props)
    }
    _renderItem = (route, index) => {
        const {
            navigation,
            jumpToIndex,
        } = this.props;

        const focused = index === navigation.state.index;
        let TabScene = {
            focused:focused,
            route:route,
            tintColor:"",
            title:route.routeName,
        };
        if(this.props.renderItem){
            return (
                <TouchableOpacity style={styles.tabItem} key={route.key} onPress={() => jumpToIndex(index)}
                                  activeOpacity={1}
                >
                    {
                        this.props.renderItem(TabScene)
                    }
                </TouchableOpacity>
            );
        }
        return (
            <TouchableOpacity
                key={route.key}
                style={styles.tabItem}
                onPress={() => jumpToIndex(index)}
            >
                <View style={styles.tabItem}>
                    <Text>{route.key}</Text>
                </View>
            </TouchableOpacity>
        );
    };
    render(){
        const {navigation} = this.props;
        const {routes} = navigation.state;
        return (
            <View style={styles.tab}>
                {routes && routes.map(
                    (route,index) =>this._renderItem(route, index))}
            </View>
        );
    }
}

TabBar.propTypes = {
    renderItem:PropTypes.func,
};