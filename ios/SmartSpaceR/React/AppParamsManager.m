//
//  AppParamsManager.m
//  SmartSpaceR
//
//  Created by 朱子豪 on 2018/3/14.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "AppParamsManager.h"

@implementation AppParamsManager
RCT_EXPORT_MODULE()
-(NSDictionary<NSString *,id> *)constantsToExport{
  return [[NSBundle mainBundle] infoDictionary];
}
@end

