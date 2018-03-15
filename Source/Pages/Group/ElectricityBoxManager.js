/**
 * Created by zhuzihao on 2018/3/12.
 */

import {BehaviorSubject} from "rxjs/Rx"
import watch from 'redux-watch'
import Store from "../../ReduxReact/APPReducers"

class _ElectricityBoxMananger {
    //当前设备
    currentSubject = new BehaviorSubject(null);
    //配电箱信息 有多少组
    infoSubject = new BehaviorSubject(null);
    //所有设备组
    groupSubject = new BehaviorSubject([]);
    info = null;
    group = [];
    constructor() {
        //配电箱首页数据
        Store.subscribe(watch(Store.getState,"GroupReducer.devideBox")((_new)=>{
            debugger
            this.info = _new;
            this.infoSubject.next(_new);
            this.currentSubject.next(_new.equipments.filter((V)=>{
                return V.is_default == 1
            }).pop());
        }));
        //配电箱组信息
        Store.subscribe(watch(Store.getState,"GroupReducer.groupInfo")((datas)=>{
            this.group = datas;
            this.groupSubject.next(this.group);
        }));
        //配电箱组移除  重新加载数据
        // Store.subscribe(watch(Store.getState,"GroupReducer.removeGroupState")((info)=>{
        //     if(info.state){
        //         let datas = this.state.datas.filter((V)=>{
        //             return V.id != info.group.id
        //         });
        //         this.group = datas;
        //         this.groupSubject.next(this.group);
        //     }
        // }))
    }
}

//管理配电箱的信息
export default ElectricityBoxMananger = new _ElectricityBoxMananger();
