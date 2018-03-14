//
//  ChartShowViewManager.m
//  SmartSpaceR
//
//  Created by 朱子豪 on 2018/3/14.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import "ChartShowViewManager.h"
#import "SmartSpaceR-Swift.h"
@implementation ChartShowViewManager
RCT_EXPORT_MODULE();
-(UIView *)view{
  return [[ChartShowView alloc] init];
}
//针对管理者
RCT_EXPORT_METHOD(updateChart:(nonnull NSNumber *)reactTag){
  [self.bridge.uiManager addUIBlock:^(RCTUIManager *uiManager, NSDictionary<NSNumber *,UIView *> *viewRegistry) {
    id view = viewRegistry[reactTag];
    if([view isKindOfClass:[ChartShowView class]]){
      ChartShowView *_view = view;
      [_view updateChart];
    }else{
      RCTLogError(@"ChartShowView - updateChart 调用失败 reactTag不能指向 ChartShowView");
    }
  }];
}

//针对View
RCT_EXPORT_VIEW_PROPERTY(backgroundColor, UIColor);
RCT_CUSTOM_VIEW_PROPERTY(chartsContent,NSDictionary,ChartShowView){
  ChartStruct *Struct = [RCTConvert ChartStruct:json];
  if(json != nil && Struct != nil){
    [view setContent:Struct];
  }
  
}
@end
