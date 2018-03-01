/**
 * Created by zhuzihao on 2018/2/28.
 */

import  { ResponseResultAction } from "../NetWork/ResponseResultAction"


//处理登入失效
export  class UserPowerLostAction extends ResponseResultAction{
    handle = null;
    constructor(handle) {
        super();
        this.handle = handle;
    }
    isActive(ops,responseJson){
        if(responseJson.res_status == 0){
            this.handle && this.handle();
            return true;
        }
        return false;
    }
    action(ResponseResult){
        return {ResponseResult,...{error:new Error("登入失效")}};
    }
}

//处理请求 错误
export class  ResulstMessageAction extends  ResponseResultAction{
    handle = null;
    constructor(handle) {
        super();
        this.handle = handle;
    }
    isActive(ops,responseJson){
        if(responseJson.res_status == -1){
            this.handle && this.handle(responseJson.res_msg);
            return true;
        }
        return false;
    }
    action(ResponseResult){
        return {ResponseResult,...{error:new Error("请求失败")}};
    }
}

//数据请求正确
export  class NetworkResultAction extends  ResponseResultAction{
    constructor(){
        super();
    }
    isActive(ops,responseJson){
        if(responseJson.res_status == 1){
            //正确返回信息
            return true;
        }
        return false;
    }
    action(result){
        let res = result.result;
        result.result = res.res_body;
        return result;
    }
}