/**
 * Created by zhuzihao on 2018/3/8.
 */


import {NetWorkManager} from "../../Tools/NetWork/NetWorkManager"
import {Types} from "../../ReduxReact/AppTypes"
//历史表格数据
class HourMeter{
    num = "";
    meter = 0.0;
}
//上一次数据
class DevideDefaultStatus{
     power = 0.0 // 时时功率
     temp = 0.0 // 时时温度
     meterd = 0.0 //今天电量
     meterm = 0.0 //当月电量
     current = [] //时时电流
     voltage = [] //时时电压
     leakage = 0.0 //漏电流
     created = 0   //数据时间
}
//电价
class PriceItem{
    fee = 0.0 //价格
    meter = 0.0 //电量数
}

class PriceCategory{
    peak = null;//高
    normal = null; //中
    valley = null; //低
}

//Main数据
export class MainDevideData{
     id = 0;
     serial_number  = "";
     name = "";
     is_primary = 0;
     status = null; //DevideDefaultStatus
     history = []; //[HourMeter]
     yesterday_fee = 0.0;
     today_fee = 0.0;
     price = 0.0;
     meter_fee = null;//PriceCategory
}


import { fork,put,take } from 'redux-saga/effects';

function *updateMainData() {
    try {
        const res = yield NetWorkManager.GET("index/index").toPromise();

        if(res && res.success){
            yield put({
                type:Types.HomeTypes.MainDataUpdate,
                MainData:res.result
            })
        }
    }catch (err){
        console.log(err);
        return
    }
}

export function * MainDataManagerFunction() {
    while (true){
        let action = yield take(Types.HomeTypes.MainDataUpdate);
        if(action.MainData == null){
            yield fork(updateMainData);
        }
    }
}
