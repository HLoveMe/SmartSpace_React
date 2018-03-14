//
//  ChartShowView.swift
//  SmartSpaceR
//
//  Created by 朱子豪 on 2018/3/14.
//  Copyright © 2018年 Facebook. All rights reserved.
//

import UIKit
import Charts
class ChartShowView: UIView {
  var chartView:UIView? = nil
  override var frame: CGRect{
    willSet{
      self.chartView?.frame = newValue
    }
  }
  func updateChart(){}
  func setContent(_ conent:ChartStruct){
    if(conent.charts.count == 0){return}
    self.chartView?.removeFromSuperview()
    let chartV = LineChartView.init()
    self.addSubview(chartV)
    chartV.frame = self.bounds
    if(conent.type == 1){
      /**配置数据*/
      chartV.noDataText = ""
      var Vals = [ChartDataEntry]()
      for one in conent.charts{
        //            Vals.append(ChartDataEntry.init(x: Double(one.index), y: Double(one.data)))
        Vals.append(ChartDataEntry.init(x: Double(one.index), y: Double(arc4random_uniform(70))))
        //      Vals.append(ChartDataEntry.init(x: Double(one.index), y: one.yD))
      }
      let set = LineChartDataSet.init(values: Vals, label: "DataSet")
      
      set.lineWidth = 2
      set.circleRadius = 4
      set.circleHoleRadius = 1
      set.setCircleColor(UIColor.white)
      set.setColor(UIColor.yellow)
      set.highlightColor = UIColor.clear
      set.drawValuesEnabled = false
      
      let chartData = LineChartData.init(dataSets: [set])
      chartData.setValueFont(UIFont.systemFont(ofSize: 12))
      chartData.setValueTextColor(UIColor.white)
      chartData.highlightEnabled = true
      chartData.setDrawValues(true)
      
      
      
      //    chartV.delegate = self
      chartV.chartDescription?.text = ""
      chartV.drawGridBackgroundEnabled = false
      //        chartV.dragEnabled = false
      chartV.setScaleEnabled(false)
      chartV.pinchZoomEnabled = false
      chartV.setViewPortOffsets(left: 20, top: 10, right: 20, bottom: 20)
      chartV.legend.enabled = false
      chartV.doubleTapToZoomEnabled = false
      chartV.setScaleMinima(2.0, scaleY: 1.0)
      chartV.dragEnabled = true
      chartV.dragDecelerationEnabled = true
      chartV.dragDecelerationFrictionCoef = 0.9
      
      
      chartV.leftAxis.enabled = false
      chartV.leftAxis.spaceTop = 0.1
      chartV.leftAxis.spaceBottom = 0.1
      chartV.leftAxis.axisMinimum = 0
      
      chartV.rightAxis.enabled = false
      
      chartV.xAxis.enabled = true
      chartV.xAxis.labelPosition = .bottom
      chartV.xAxis.drawGridLinesEnabled = false
      chartV.xAxis.axisLineColor  = UIColor.white
      chartV.xAxis.axisLineWidth = 1
      chartV.xAxis.labelFont = UIFont.systemFont(ofSize: 14)
      chartV.xAxis.labelTextColor = UIColor.white
      chartV.xAxis.labelCount = 11
      //    chartV.xAxis.valueFormatter = EleAxisValueFormatter.init(data: self.model!.charts)
      
      chartV.data = chartData
      
      chartV.animate(xAxisDuration: 2.5)
    }else{
      //柱状图
    }
    
    self.chartView = chartV
  }
}
