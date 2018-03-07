/**
 * Created by zhuzihao on 2018/3/7.
 */


import { Interceptor } from "../NetWork/Interceptor"

export class AutoURLStringization extends  Interceptor{
    baseString = null;
    /** 使用 初始化 */
    constructor(base){
        super(base);
        this.base = base;
    }
    intercept(option,next){
        let url  = option.url;
        url = this.base + url;
        option.url = url;
        return next(option);
    }
}