/**
 * Created by zhuzihao on 2018/3/14.
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { requireNativeComponent, NativeModules,findNodeHandle} from 'react-native';
const { ChartShowViewManager } = NativeModules;
const ChartShowView = requireNativeComponent("ChartShowView",_ChartView,{});
import {connect} from "react-redux"
class _ChartView extends Component{
    constructor(ops){
        super(ops)
    }
    componentDidMount(){
        //ChartShowViewManager.updateChart(tag);
    }
    // componentWillReceiveProps(){}
    render(){
        return (
            <ChartShowView ref="chartView" {...this.props} chartsContent={{charts:this.props.charts,type:this.props.type}}>

            </ChartShowView>
        )
    }
}
_ChartView.propTypes = {
    data:PropTypes.any.isRequired,
    type:PropTypes.number.isRequired,
};

const  mapStateToProps=(state,props)=>{
    return {
        style:props.style,
        charts:props.data.charts,
        type:props.type
    }
}

export default ChartView = connect(mapStateToProps)(_ChartView);