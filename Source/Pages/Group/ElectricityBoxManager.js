/**
 * Created by zhuzihao on 2018/3/12.
 */

import {BehaviorSubject} from "rxjs/Rx"
import watch from 'redux-watch'
import Store from "../../ReduxReact/APPReducers"

class _ElectricityBoxMananger {
    //配电箱信息 有多少组
    infoSubject = new BehaviorSubject(null);

    groupSubject = new BehaviorSubject([]);
    info = null;
    group = [];
    constructor() {
        //配电箱首页数据
        Store.subscribe(watch(Store.getState,"GroupReducer.devideBox")((_new)=>{
            this.info = _new;
            this.infoSubject.next(_new);
        }));
        //配电箱组信息
        Store.subscribe(watch(Store.getState,"GroupReducer.groupInfo")((datas)=>{
            this.group = datas;
            this.groupSubject.next(this.group);
        }))
        //配电箱组移除
        Store.subscribe(watch(Store.getState,"GroupReducer.removeGroupState")((info)=>{
            if(info.state){
                let datas = this.state.datas.filter((V)=>{
                    return V.id != info.group.id
                });
                this.group = datas;
                this.groupSubject.next(this.group);
            }
        }))
    }
}

export default ElectricityBoxMananger = new _ElectricityBoxMananger();
