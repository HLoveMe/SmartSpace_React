
import {BehaviorSubject} from "rxjs/Rx"
import Store from "../../ReduxReact/APPReducers"
import watch from 'redux-watch'

class _MainDataManager {
    dataSubject = new BehaviorSubject(null);
    data = null;
    constructor() {
        Store.subscribe(watch(Store.getState,"HomeReducer.MainData")((_new)=>{
            this.data = _new;
            this.dataSubject.next(_new);
        }));
    }
}


//首页数据管理
export default MainDataManager = new _MainDataManager();

/**
 *
 *
 * */