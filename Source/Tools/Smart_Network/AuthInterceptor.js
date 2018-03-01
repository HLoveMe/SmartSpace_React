/**
 * Created by zhuzihao on 2018/2/28.
 */
/**
 * Created by zhuzihao on 2017/11/28.
 */

import { Interceptor } from "../NetWork/Interceptor"
import { UserInfo,UserInfoManager } from "../../Pages/Account/UserInfoManager"

class _AutoAuthorization extends  Interceptor{
    user = null;
    _Authorization = "朱子豪";
    /** 使用 初始化 */
    constructor(ops){
        super(ops);
        UserInfoManager.userSubject.subscribe((user)=>{
            this.user = user;
        })
    }
    intercept(option,next){
        let headers  = option.headers;
        headers["Authorization"] = this.user ? (this.user.token || this._Authorization) : this._Authorization;
        headers["Content-Type"] = "application/x-www-form-urlencoded";
        option.headers = headers;
        return next(option);
    }
}

export  const AutoAuthorization = new _AutoAuthorization();

