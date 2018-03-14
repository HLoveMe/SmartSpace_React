//
//  RCTConvert+Charts.h
//  SmartSpaceR
//
//  Created by 朱子豪 on 2018/3/14.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <React/RCTConvert.h>
#import "ChartDataSet.h"
@interface RCTConvert (Charts)
+(ChartStruct*)ChartStruct:(id)json;
@end
