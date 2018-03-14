//
//  ChartShowView.h
//  SmartSpaceR
//
//  Created by 朱子豪 on 2018/3/14.
//  Copyright © 2018年 Facebook. All rights reserved.
//

#import <UIKit/UIKit.h>

@interface ChartData : NSObject
@property(nonatomic,copy)NSString *xD;
@property(nonatomic,assign)double yD;
@property(nonatomic,assign)int index;
@end
@interface ChartStruct : NSObject
@property(nonatomic,assign)int type;
@property(nonatomic,strong)NSArray<ChartData*> *charts;
@end
