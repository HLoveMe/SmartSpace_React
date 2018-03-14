//
//  RCTConvert+Charts.m
//  SmartSpaceR
//
//  Created by 朱子豪 on 2018/3/14.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "RCTConvert+Charts.h"

@implementation RCTConvert (Charts)
+(ChartStruct*)ChartStruct:(id)json{
  NSDictionary *dic = json;
  ChartStruct *data =  [[ChartStruct alloc] init];
  data.type = [dic[@"type"] intValue];
  NSArray *charts = dic[@"charts"];
  NSMutableArray *_charts = [NSMutableArray array];
  [charts enumerateObjectsUsingBlock:^(NSDictionary *obj, NSUInteger idx, BOOL * _Nonnull stop) {
    ChartData *_data  = [[ChartData alloc] init];
    [_data setValuesForKeysWithDictionary:obj];
    [_charts addObject:_data];
  }];
  data.charts = _charts;
  return data;
}
@end
